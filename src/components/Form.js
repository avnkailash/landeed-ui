import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setSubmissionTimeout,
  setCurrentForm,
} from "../features/forms/formSlice";

const Form = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.forms.currentForm);
  const formData = useSelector((state) => state.forms.formData);
  const submissionTimeout = useSelector(
    (state) => state.forms.submissionTimeout
  );

  const [localFormData, setLocalFormData] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem(`form_${currentForm.id}`);
    const savedTimeout = localStorage.getItem(`form_timeout_${currentForm.id}`);
    if (savedData && savedTimeout && new Date().getTime() < savedTimeout) {
      dispatch(setFormData(JSON.parse(savedData)));
      dispatch(setSubmissionTimeout(savedTimeout));
      setLocalFormData(JSON.parse(savedData));
    } else {
      localStorage.removeItem(`form_${currentForm.id}`);
      localStorage.removeItem(`form_timeout_${currentForm.id}`);
    }
  }, [currentForm, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...localFormData,
      [name]: value,
    };
    setLocalFormData(updatedFormData);
    dispatch(setFormData(updatedFormData));
    localStorage.setItem(
      `form_${currentForm.id}`,
      JSON.stringify(updatedFormData)
    );
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    const updatedFormData = {
      ...localFormData,
      [name]: selectedOptions,
    };
    setLocalFormData(updatedFormData);
    dispatch(setFormData(updatedFormData));
    localStorage.setItem(
      `form_${currentForm.id}`,
      JSON.stringify(updatedFormData)
    );
  };

  const handlePageChange = (action) => {
    if (action === "next_page") {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    } else if (action === "submit_form") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    // Implement form submission logic here
    fetch("http://localhost:8000/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form_id: currentForm.id,
        data: localFormData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful form submission
        dispatch(setCurrentForm(null));
        localStorage.removeItem(`form_${currentForm.id}`);
        localStorage.removeItem(`form_timeout_${currentForm.id}`);
      })
      .catch((error) => {
        // Handle form submission error
        console.error("Error submitting form:", error);
      });
  };

  const currentPage = currentForm.pages[currentPageIndex];

  const renderField = (field) => {
    const commonStyles = `border p-2 w-full ${
      field.metadata.styles.width || "w-full"
    }`;

    switch (field.type) {
      case "text":
        return (
          <>
            <label className="block mb-1">{field.name}</label>
            <input
              type="text"
              name={field.id}
              value={localFormData[field.id] || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              className={commonStyles}
            />
          </>
        );
      case "number":
        return (
          <>
            <label className="block mb-1">{field.name}</label>
            <input
              type="number"
              name={field.id}
              value={localFormData[field.id] || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              className={commonStyles}
              min={field.metadata.min}
              max={field.metadata.max}
            />
          </>
        );
      case "date":
        return (
          <>
            <label className="block mb-1">{field.name}</label>
            <input
              type="date"
              name={field.id}
              value={localFormData[field.id] || ""}
              required={field.required}
              onChange={handleChange}
              className={commonStyles}
            />
          </>
        );
      case "select":
        return (
          <>
            <label className="block mb-1">{field.name}</label>
            <select
              name={field.id}
              value={localFormData[field.id] || ""}
              required={field.required}
              onChange={handleChange}
              className={commonStyles}
            >
              <option value="" disabled>
                Select {field.name}
              </option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        );
      case "multi-select":
        return (
          <>
            <label className="block mb-1">{field.name}</label>
            <select
              name={field.id}
              multiple
              value={localFormData[field.id] || []}
              required={field.required}
              onChange={handleMultiSelectChange}
              className={commonStyles}
            >
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        );
      case "button":
      case "buttom":
        return (
          <button
            type={field.metadata.action === "submit_form" ? "submit" : "button"}
            onClick={() => handlePageChange(field.metadata.action)}
            className={`bg-blue-500 text-white p-2 ${
              field.metadata.styles.width || "w-full"
            }`}
          >
            {field.name}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{currentForm.name}</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-2">{currentPage.name}</h2>
        {currentPage.fields.map((field) => (
          <div key={field.id} className="mb-2">
            {renderField(field)}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Form;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setSubmissionTimeout,
  setCurrentForm,
} from "../features/forms/formSlice";
import TimerComponent from "./Timer";
import SuccessScreen from "./SuccessScreen";
import TextInput from "./FormElements/TextInput";
import NumberInput from "./FormElements/NumberInput";
import DateInput from "./FormElements/DateInput";
import SelectInput from "./FormElements/SelectInput";
import MultiSelectInput from "./FormElements/MultiSelectInput";
import Button from "./FormElements/Button";
import { useParams } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  // const { formId } = useParams < { formId: string } > "";

  const currentForm = useSelector((state) => state.forms.currentForm);
  const submissionTimeout = useSelector(
    (state) => state.forms.currentForm?.form_timeout
  );

  const [localFormData, setLocalFormData] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

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
    } else if (action === "previous_page") {
      setCurrentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (action === "submit_form") {
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    try {
      const submissionResponse = await fetch(
        "http://localhost:8000/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form_id: currentForm.id,
            data: localFormData,
          }),
        }
      );
      const response = await submissionResponse.json();
      console.log("response", response);

      dispatch(setFormData({}));
      localStorage.removeItem(`form_${currentForm.id}`);
      localStorage.removeItem(`form_timeout_${currentForm.id}`);
      localStorage.removeItem("endTime");
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleTimeout = () => {
    dispatch(setCurrentForm(null));
    dispatch(setFormData({}));
    localStorage.removeItem(`form_${currentForm.id}`);
    localStorage.removeItem(`form_timeout_${currentForm.id}`);
    localStorage.removeItem("endTime");
  };

  const currentPage = currentForm.pages[currentPageIndex];

  const renderField = (field) => {
    const commonStyles = `border p-2 w-full ${
      field.metadata.styles.width || "w-full"
    }`;

    switch (field.type) {
      case "text":
        return (
          <TextInput
            field={field}
            localFormData={localFormData}
            onChange={handleChange}
            commonStyles={commonStyles}
          />
        );
      case "number":
        return (
          <NumberInput
            field={field}
            localFormData={localFormData}
            onChange={handleChange}
            commonStyles={commonStyles}
          />
        );
      case "date":
        return (
          <DateInput
            field={field}
            localFormData={localFormData}
            onChange={handleChange}
            commonStyles={commonStyles}
          />
        );

      case "select":
        return (
          <SelectInput
            field={field}
            localFormData={localFormData}
            onChange={handleChange}
            commonStyles={commonStyles}
          />
        );
      case "multi-select":
        return (
          <MultiSelectInput
            field={field}
            localFormData={localFormData}
            onChange={handleMultiSelectChange}
            commonStyles={commonStyles}
          />
        );
      case "button":
        return <Button field={field} onClick={handlePageChange} />;
      default:
        return null;
    }
  };

  if (showSuccessScreen) {
    return <SuccessScreen />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-row space-x-4 items-center bg-gray-300 py-2 px-4">
        <h1 className="text-2xl font-bold">{currentForm.name}</h1>
        {submissionTimeout && (
          <TimerComponent
            minutes={submissionTimeout}
            onTimeout={handleTimeout}
          />
        )}
      </div>

      <form className="py-2 px-4">
        <h2 className="text-xl font-bold mb-2 justify-center">
          {currentPage.name}
        </h2>
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

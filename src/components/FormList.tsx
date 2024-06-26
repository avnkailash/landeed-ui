import React, { useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setForms, setCurrentForm } from "../features/forms/formSlice";
import { FaChevronDown } from "react-icons/fa";
import { RootState } from "../store";
import { Form } from "../types";

const FormList: React.FC = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);

  const fetchForms = async () => {
    const response = await fetch("http://localhost:8000/api/forms");
    const data = await response.json();
    console.log("data", data?.data || []);
    dispatch(setForms(data?.data || []));
  };

  const handleFormChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedForm = forms.find(
      (form: Form) => form.name === event.target.value
    );
    dispatch(setCurrentForm(selectedForm));
  };

  useEffect(() => {
    fetchForms();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Select a Form</h1>
      <div className="relative w-64">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          defaultValue=""
          onChange={handleFormChange}
        >
          <option value="" disabled>
            Select a form
          </option>
          {forms.map((form: Form) => (
            <option key={form.id} value={form.name}>
              {form.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FaChevronDown />
        </div>
      </div>
    </div>
  );
};

export default FormList;

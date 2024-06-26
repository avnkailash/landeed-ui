import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentForm, setFormData } from "../features/forms/formSlice";
import { useHistory } from "react-router-dom";

const SuccessScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleBackToFormsList = () => {
    dispatch(setCurrentForm(null));
    dispatch(setFormData({}));
    localStorage.removeItem("endTime");
    history.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Form Submitted Successfully!</h1>
      <button
        onClick={handleBackToFormsList}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Back to Forms List
      </button>
    </div>
  );
};

export default SuccessScreen;

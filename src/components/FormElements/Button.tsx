import React from "react";
import { Field } from "../../types";

interface ButtonProps {
  field: Field;
  onClick: (action: string) => void;
}

const Button: React.FC<ButtonProps> = ({ field, onClick }) => {
  return (
    <button
      type={field.metadata.action === "submit_form" ? "submit" : "button"}
      onClick={() => onClick(field.metadata.action || "")}
      className={`bg-blue-500 text-white p-2 ${
        field.metadata.styles.width || "w-full"
      }`}
    >
      {field.name}
    </button>
  );
};
export default Button;

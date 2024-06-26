import React from "react";
import { Field } from "../../types";

interface ButtonProps {
  field: Field;
  styles: Record<string, string>;
  commonStyles: string;
  onClick: (action: string) => void;
}

const Button: React.FC<ButtonProps> = ({
  field,
  commonStyles,
  styles,
  onClick,
}) => {
  return (
    <button
      type={field.metadata.action === "submit_form" ? "submit" : "button"}
      onClick={() => onClick(field.metadata.action || "")}
      className={`bg-blue-500 text-white p-2 rounded-md ${commonStyles}`}
      style={styles}
    >
      {field.name}
    </button>
  );
};
export default Button;

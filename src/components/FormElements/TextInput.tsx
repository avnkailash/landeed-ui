import React from "react";
import { Field } from "../../types";

interface TextInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  field,
  localFormData,
  commonStyles,
  onChange,
}) => {
  return (
    <>
      <label className="block mb-1">{field.name}</label>
      <input
        type="text"
        name={field.id}
        value={localFormData[field.id] || ""}
        placeholder={field.placeholder}
        required={field.required}
        onChange={onChange}
        className={commonStyles}
      />
    </>
  );
};
export default TextInput;

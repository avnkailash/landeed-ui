import React from "react";
import { Field } from "../../types";

interface NumberInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  field,
  localFormData,
  commonStyles,
  onChange,
}) => {
  return (
    <>
      <label className="block mb-1">{field.name}</label>
      <input
        type="number"
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
export default NumberInput;

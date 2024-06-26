import React from "react";
import { Field } from "../../types";

interface SelectInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  field,
  localFormData,
  commonStyles,
  onChange,
}) => {
  return (
    <>
      <label className="block mb-1">{field.name}</label>
      <select
        name={field.id}
        value={localFormData[field.id] || ""}
        required={field.required}
        onChange={onChange}
        className={commonStyles}
      >
        <option value="" disabled>
          Select {field.name}
        </option>
        {field?.options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
export default SelectInput;

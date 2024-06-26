import React from "react";
import { Field } from "../../types";

interface MultiSelectInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  styles: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  field,
  localFormData,
  commonStyles,
  styles,
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
        style={styles}
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
export default MultiSelectInput;

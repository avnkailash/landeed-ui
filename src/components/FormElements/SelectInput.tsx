import React from "react";
import { Field } from "../../types";

interface SelectInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  styles: Record<string, string>;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  field,
  localFormData,
  commonStyles,
  styles,
  onChange,
}) => {
  const allow_other = field.metadata?.allow_other;

  console.log("field", field, allow_other);

  return (
    <div className="">
      <label className="block mb-1">{field.name}</label>
      <div className="flex flex-row space-x-4">
        <select
          name={field.id}
          value={localFormData[field.id] || ""}
          required={field.required}
          onChange={onChange}
          className={commonStyles}
          style={{ ...styles }}
        >
          <option value="" disabled>
            Select {field.name}
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          {allow_other && <option value="other">Other</option>}
        </select>

        {localFormData[field.id] === "other" && (
          <input
            type="text"
            name={`${field.id}_other`}
            value={localFormData[`${field.id}_other`] || ""}
            placeholder={`Enter ${field.name}`}
            required={field.required}
            onChange={onChange}
            className={commonStyles}
            style={{ ...styles }}
          />
        )}
      </div>
    </div>
  );
};
export default SelectInput;

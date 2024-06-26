import React from "react";
import { Field } from "../../types";

interface DateInputProps {
  field: Field;
  localFormData: Record<string, any>;
  commonStyles: string;
  styles: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  field,
  localFormData,
  commonStyles,
  styles,
  onChange,
}) => {
  return (
    <>
      <label className="block mb-1">{field.name}</label>
      <input
        type="date"
        name={field.id}
        value={localFormData[field.id] || ""}
        placeholder={field.placeholder}
        required={field.required}
        onChange={onChange}
        className={commonStyles}
        style={styles}
      />
    </>
  );
};
export default DateInput;

import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="custom-form-group">
    <div className="custom-input-group">
      {icon && <span className="custom-input-icon">{icon}</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="custom-form-input"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default Input;

import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  togglePasswordVisibility,
}) => (
  <div className="custom-form-group">
    <div className="custom-input-group">
      <span className="custom-input-icon">
        <FaLock />
      </span>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        required
        className="custom-form-input"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="custom-password-toggle"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
);

export default PasswordInput;

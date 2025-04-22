import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  buttonText: string;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  buttonText,
  loadingText,
}) => (
  <button
    type="submit"
    disabled={isLoading}
    className="custom-btn custom-btn-primary custom-mt-6"
  >
    {isLoading ? loadingText || "Loading..." : buttonText}
  </button>
);

export default SubmitButton;

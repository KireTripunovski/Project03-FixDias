import React, { useState } from "react";

interface AccountDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
  onEmailChange?: (newEmail: string) => void;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  firstName,
  lastName,
  email,
  onEmailChange,
}) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState(email);

  const handleEmailSave = () => {
    if (onEmailChange && emailValue !== email) {
      onEmailChange(emailValue);
    }
    setIsEditingEmail(false);
  };

  return (
    <>
      {/* Name Fields */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            First name <span className="text-red-500">*</span>
          </label>
          <div className="border-b border-gray-200 pb-1">
            <span className="text-sm">{firstName}</span>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Last name <span className="text-red-500">*</span>
          </label>
          <div className="border-b border-gray-200 pb-1">
            <span className="text-sm">{lastName}</span>
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">
          E-mail address <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-between items-center border-b border-gray-200 pb-1">
          {isEditingEmail ? (
            <div className="flex-1 mr-2">
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded"
                autoFocus
              />
              <p className="text-xs text-[#ff6600]">Verify email address</p>
            </div>
          ) : (
            <div>
              <span className="text-sm">{email}</span>
              <p className="text-xs text-[#ff6600]">Verify email address</p>
            </div>
          )}

          {isEditingEmail ? (
            <div>
              <button
                onClick={handleEmailSave}
                className="px-3 py-1 border border-[#ff6600] rounded-md text-sm text-[#ff6600] mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditingEmail(false);
                  setEmailValue(email); // Reset to original value
                }}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-800"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingEmail(true)}
              className="px-3 py-1 border border-[#ff6600] rounded-md text-sm text-gray-800"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

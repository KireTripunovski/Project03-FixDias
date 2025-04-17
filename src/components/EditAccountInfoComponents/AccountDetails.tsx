import React from "react";

interface AccountDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  firstName,
  lastName,
  email,
}) => {
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
          <div>
            <span className="text-sm">{email}</span>
            <p className="text-xs text-[#ff6600]">Verify email address</p>
          </div>
          <button className="px-3 py-1 border border-[#ff6600] rounded-md text-sm text-gray-800">
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

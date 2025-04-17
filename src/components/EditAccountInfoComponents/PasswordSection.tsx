import React from "react";

export const PasswordSection: React.FC = () => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Change Password</label>
      <div className="flex justify-between items-center border-b border-gray-200 pb-1">
        <span className="text-sm">*****************</span>
        <button className="px-3 py-1 border border-[#ff6600] rounded-md text-sm text-gray-800">
          Change
        </button>
      </div>
    </div>
  );
};

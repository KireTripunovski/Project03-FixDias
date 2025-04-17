import React from "react";

interface ContactDetailsProps {
  location: string | null;
  telephone: string | null;
  onOpenLocationModal: () => void;
  onOpenTelephoneModal: () => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  location,
  telephone,
  onOpenLocationModal,
  onOpenTelephoneModal,
}) => {
  return (
    <>
      {/* Location */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Location <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-between items-center border-b border-gray-200 pb-1">
          <span className="text-sm text-gray-500">
            {location || "No location added yet"}
          </span>
          <button
            style={{ backgroundColor: "#FA6100" }}
            className="px-3 py-1 bg-[#FA6100] text-white rounded-md text-sm"
            onClick={onOpenLocationModal}
          >
            Add
          </button>
        </div>
      </div>

      {/* Telephone */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Telephone number
        </label>
        <div className="flex justify-between items-center border-b border-gray-200 pb-1">
          <span className="text-sm text-gray-500">
            {telephone || "No telephone number yet entered"}
          </span>
          <button
            style={{ backgroundColor: "#FA6100" }}
            className="px-3 py-1 bg-[#FA6100] text-white rounded-md text-sm"
            onClick={onOpenTelephoneModal}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

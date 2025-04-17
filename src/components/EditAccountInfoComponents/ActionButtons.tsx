import React from "react";

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSave,
}) => {
  return (
    <div className="px-4 py-4 flex gap-4">
      <button
        className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-800 font-medium"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        style={{ backgroundColor: "#ff6600" }}
        className="flex-1 py-3 bg-[#ff7752] text-white rounded-lg font-medium"
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
};

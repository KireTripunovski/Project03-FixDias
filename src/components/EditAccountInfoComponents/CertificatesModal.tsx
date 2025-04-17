import React from "react";
import { Modal } from "../../ui/Modal";

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  newCertificates: string;
  setNewCertificates: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => Promise<void>;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({
  isOpen,
  onClose,
  newCertificates,
  setNewCertificates,
  onSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Certificates">
      <div>
        <label
          htmlFor="certificates"
          className="block text-sm font-medium mb-1"
        >
          Enter your certificates (comma-separated)
        </label>
        <textarea
          id="certificates"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ff6600] focus:border-[#ff6600] sm:text-sm"
          rows={3}
          value={newCertificates}
          onChange={(e) => setNewCertificates(e.target.value)}
        />
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          style={{ backgroundColor: "#ff6600" }}
          className="px-4 py-2 text-white rounded-md shadow-sm hover:bg-[#e05a00] focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 sm:text-sm"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

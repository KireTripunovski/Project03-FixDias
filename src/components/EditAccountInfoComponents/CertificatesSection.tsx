import React from "react";

interface CertificatesSectionProps {
  certificates: string | null;
  onOpenCertificatesModal: () => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  onOpenCertificatesModal,
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <label className="text-sm font-medium">Certificates!</label>
        <div className="ml-2 bg-blue-100 rounded-full px-1 flex items-center">
          <span className="text-blue-600 text-xs">i</span>
        </div>
        <span className="text-xs text-blue-600 ml-1">
          More orders with certificates!
        </span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-200 pb-1">
        <span className="text-sm text-gray-500">
          {certificates || "No certificates added yet"}
        </span>
        <button
          style={{ backgroundColor: "#FA6100" }}
          className="px-3 py-1 bg-[#FA6100] text-white rounded-md text-sm"
          onClick={onOpenCertificatesModal}
        >
          Add
        </button>
      </div>
    </div>
  );
};

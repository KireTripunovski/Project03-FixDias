import React from "react";
import { Modal } from "../../ui/Modal";
import { MapPin } from "lucide-react";
import { Location } from "../../store/useProfileStore";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLocation: Location;
  setNewLocation: React.Dispatch<React.SetStateAction<Location>>;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  useCurrentLocation: () => void;
  onSave: () => Promise<void>;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  newLocation,
  setNewLocation,
  isGeolocationAvailable,
  isGeolocationEnabled,
  useCurrentLocation,
  onSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Location">
      <div className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ff6600] focus:border-[#ff6600] sm:text-sm"
            value={newLocation.city || ""}
            onChange={(e) =>
              setNewLocation((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="state"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ff6600] focus:border-[#ff6600] sm:text-sm"
            value={newLocation.state || ""}
            onChange={(e) =>
              setNewLocation((prev) => ({ ...prev, state: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ff6600] focus:border-[#ff6600] sm:text-sm"
            value={newLocation.zipCode || ""}
            onChange={(e) =>
              setNewLocation((prev) => ({ ...prev, zipCode: e.target.value }))
            }
          />
        </div>
        {isGeolocationAvailable && isGeolocationEnabled && (
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            onClick={useCurrentLocation}
          >
            <MapPin className="h-4 w-4" />
            Use current location
          </button>
        )}
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

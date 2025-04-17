import React, { useState } from "react";
import useBookingStore from "../../store/CalendarBookings";
import { format } from "date-fns";
import { Modal } from "../../ui/Modal";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

export default function BookingForm({
  isOpen,
  onClose,
  selectedDate,
}: BookingFormProps) {
  const addBooking = useBookingStore((state) => state.addBooking);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    startTime: "12:00",
    endTime: "13:00",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDateString = format(selectedDate, "yyyy-MM-dd");

    await addBooking({
      title: formData.title,
      location: formData.location,
      description: formData.description,
      from: `${selectedDateString}T${formData.startTime}:00`,
      to: `${selectedDateString}T${formData.endTime}:00`,
    });

    setFormData({
      title: "",
      location: "",
      description: "",
      startTime: "12:00",
      endTime: "13:00",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Event">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="text"
            value={format(selectedDate, "MMMM d, yyyy")}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              min={formData.startTime}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

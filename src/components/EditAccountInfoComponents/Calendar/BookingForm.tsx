import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import useBookingStore from "../../../store/useCalendarBookings";
import { Modal } from "../../../ui/Modal";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  showDatePicker?: boolean;
}

interface State {
  id: number;
  name: string;
  country_name: string;
  latitude: string;
  longitude: string;
}

export default function BookingForm({
  isOpen,
  onClose,
  selectedDate,
  showDatePicker = false,
}: BookingFormProps) {
  const addBooking = useBookingStore((state) => state.addBooking);
  const [formDate, setFormDate] = useState<Date>(selectedDate);

  const [formData, setFormData] = useState({
    title: "",
    location: { address: "", lat: 0, lng: 0 },
    description: "",
    startTime: "12:00",
    endTime: "13:00",
    userId: "",
    country: "",
    stateId: "",
  });

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = states.find(
      (state) => state.id === parseInt(e.target.value)
    );
    if (selectedState) {
      setFormData({
        ...formData,
        stateId: e.target.value,
        location: {
          address: selectedState.name,
          lat: parseFloat(selectedState.latitude),
          lng: parseFloat(selectedState.longitude),
        },
        country: selectedState.country_name,
      });
    }
  };

  const [states] = useState<State[]>([
    {
      id: 1,
      name: "Baden-Württemberg",
      country_name: "Germany",
      latitude: "48.66160370",
      longitude: "9.35013360",
    },
    {
      id: 2,
      name: "Bavaria",
      country_name: "Germany",
      latitude: "48.79044720",
      longitude: "11.49788950",
    },
    {
      id: 3,
      name: "Berlin",
      country_name: "Germany",
      latitude: "52.52000660",
      longitude: "13.40495400",
    },
    {
      id: 4,
      name: "Brandenburg",
      country_name: "Germany",
      latitude: "52.41252870",
      longitude: "12.53164440",
    },
    {
      id: 5,
      name: "Bremen",
      country_name: "Germany",
      latitude: "53.07929620",
      longitude: "8.80169360",
    },
    {
      id: 6,
      name: "Hamburg",
      country_name: "Germany",
      latitude: "53.55108460",
      longitude: "9.99368190",
    },
    {
      id: 7,
      name: "Hesse",
      country_name: "Germany",
      latitude: "50.65205150",
      longitude: "9.16243760",
    },
    {
      id: 8,
      name: "Lower Saxony",
      country_name: "Germany",
      latitude: "52.63670360",
      longitude: "9.84507660",
    },
    {
      id: 9,
      name: "Mecklenburg-Vorpommern",
      country_name: "Germany",
      latitude: "53.61265050",
      longitude: "12.42959530",
    },
    {
      id: 10,
      name: "North Rhine-Westphalia",
      country_name: "Germany",
      latitude: "51.43323670",
      longitude: "7.66159380",
    },
    {
      id: 11,
      name: "Rhineland-Palatinate",
      country_name: "Germany",
      latitude: "50.11834600",
      longitude: "7.30895270",
    },
    {
      id: 12,
      name: "Saarland",
      country_name: "Germany",
      latitude: "49.39642340",
      longitude: "7.02296070",
    },
    {
      id: 13,
      name: "Saxony",
      country_name: "Germany",
      latitude: "51.10454070",
      longitude: "13.20173840",
    },
    {
      id: 14,
      name: "Saxony-Anhalt",
      country_name: "Germany",
      latitude: "51.95026490",
      longitude: "11.69227340",
    },
    {
      id: 15,
      name: "Schleswig-Holstein",
      country_name: "Germany",
      latitude: "54.21936720",
      longitude: "9.69611670",
    },
    {
      id: 16,
      name: "Thuringia",
      country_name: "Germany",
      latitude: "51.01098920",
      longitude: "10.84534600",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDateString = format(formDate, "yyyy-MM-dd");
    await addBooking({
      title: formData.title,
      location: formData.location,
      description: formData.description,
      from: `${selectedDateString}T${formData.startTime}:00`,
      to: `${selectedDateString}T${formData.endTime}:00`,
      userId: formData.userId,
    });

    setFormData({
      title: "",
      location: { address: "", lat: 0, lng: 0 },
      description: "",
      startTime: "12:00",
      endTime: "13:00",
      userId: "",
      country: "",
      stateId: "",
    });
    onClose();
  };
  useEffect(() => {
    setFormDate(selectedDate);
  }, [selectedDate]);
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setFormDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setFormDate(value[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Event">
      <form
        style={{ height: "100%" }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {showDatePicker && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <div className="calendar-picker-container">
              <Calendar
                value={formDate}
                onChange={handleDateChange}
                className="w-full"
              />
            </div>
            <p className="mt-2 text-sm text-blue-600">
              Selected date: {format(formDate, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
        )}

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
          <select
            value={formData.stateId}
            onChange={handleStateChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a state
            </option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
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

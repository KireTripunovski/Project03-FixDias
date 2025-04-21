import { format, parseISO } from "date-fns";
import { Trash2 } from "lucide-react";
import useBookingStore from "../../store/useCalendarBookings";
import { CalendarBooking } from "../../types/types";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function BookingList() {
  const { bookings, deleteBooking } = useBookingStore();
  const navigate = useNavigate();
  // Sort bookings by from date
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime();
  });

  const formatTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return format(date, "h:mm a"); // e.g. "2:30 PM"
    } catch (e) {
      console.error("Error formatting time:", e);
      return "";
    }
  };
  const handleNavigateToMap = (booking: CalendarBooking) => {
    navigate(
      `/map?lat=${booking.location.lat}&lng=${
        booking.location.lng
      }&address=${encodeURIComponent(
        booking.location.address
      )}&description=${encodeURIComponent(booking.description)}`
    );
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 py-15">Upcoming Bookings</h2>
      <div className="space-y-4 h-[500px] overflow-y-scroll">
        {sortedBookings.map((booking: CalendarBooking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{booking.title}</h3>
              <p className="text-gray-600 text-sm">
                {formatTime(booking.from)} -{formatTime(booking.to)}
              </p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <LuMapPin className="text-blue-500 " />{" "}
                <p className="text-gray-600">{booking.location.address}</p>
              </div>
              <button
                onClick={() => handleNavigateToMap(booking)}
                className="text-blue-500 hover:text-blue-700 mt-2 "
              >
                Show on Map
              </button>{" "}
            </div>

            <button
              onClick={() => deleteBooking(booking.id)}
              className="text-red-600 hover:text-red-800 text-center"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {sortedBookings.length === 0 && (
          <p className="text-gray-500 text-center">No bookings scheduled</p>
        )}
      </div>
    </div>
  );
}

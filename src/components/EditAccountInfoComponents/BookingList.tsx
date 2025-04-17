import { format, parseISO } from "date-fns";
import { Trash2 } from "lucide-react";
import useBookingStore from "../../store/CalendarBookings";
import { CalendarBooking } from "../../types/types";

export default function BookingList() {
  const { bookings, deleteBooking } = useBookingStore();

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

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
      <div className="space-y-4">
        {sortedBookings.map((booking: CalendarBooking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-lg">{booking.title}</h3>
              <p className="text-gray-600">
                {formatTime(booking.from)} -{formatTime(booking.to)}
              </p>
              <p className="text-gray-600">{booking.location}</p>
              <p className="text-gray-700 mt-2">{booking.description}</p>
            </div>
            <button
              onClick={() => deleteBooking(booking.id)}
              className="text-red-600 hover:text-red-800"
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

import { format, parseISO, isSameDay } from "date-fns";
import { Trash2 } from "lucide-react";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useDateTimeContext } from "../../context/DateTimeContextType";
import useBookingStore from "../../../store/useCalendarBookings";
import { CalendarBooking } from "../../../types/types";

export default function BookingList() {
  const { formatTime, formatDateHeading } = useDateTimeContext();

  const { bookings, deleteBooking, isLoading } = useBookingStore();
  const navigate = useNavigate();

  const groupedBookings = bookings.reduce((acc, booking) => {
    try {
      const bookingDate = parseISO(booking.from);
      const dateKey = format(bookingDate, "yyyy-MM-dd");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(booking);
      return acc;
    } catch (error) {
      console.error("Error processing booking:", error);
      return acc;
    }
  }, {} as Record<string, CalendarBooking[]>);

  const sortedDates = Object.keys(groupedBookings).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (isSameDay(dateA, new Date())) return -1;
    if (isSameDay(dateB, new Date())) return 1;

    return dateA.getTime() - dateB.getTime();
  });

  const handleNavigateToMap = (booking: CalendarBooking) => {
    navigate(
      `/map?lat=${booking.location.lat}&lng=${
        booking.location.lng
      }&address=${encodeURIComponent(
        booking.location.address
      )}&description=${encodeURIComponent(booking.description)}`
    );
  };

  if (isLoading) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
        <div className="text-center py-10">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
      <div className="space-y-6 h-[500px] overflow-y-auto pr-2">
        {sortedDates.length > 0 ? (
          sortedDates.map((dateKey) => {
            const { formattedDate, isToday } = formatDateHeading(dateKey);
            const dailyBookings = groupedBookings[dateKey].sort(
              (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()
            );

            return (
              <div key={dateKey} className="mb-4">
                <h3
                  className={`font-medium text-sm px-2 py-1 mb-2 rounded ${
                    isToday ? "bg-blue-100 text-blue-700" : "bg-gray-100"
                  }`}
                >
                  {formattedDate} {isToday && "(Today)"}
                </h3>
                <div className="space-y-3">
                  {dailyBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {booking.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {formatTime(booking.from)} - {formatTime(booking.to)}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <LuMapPin className="text-blue-500" />
                          <p className="text-gray-600">
                            {booking.location.address}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigateToMap(booking)}
                          className="text-blue-500 hover:text-blue-700 mt-2"
                        >
                          Show on Map
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteBooking(booking.id);
                        }}
                        className="text-red-600 hover:text-red-800 text-center"
                        disabled={isLoading}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No bookings scheduled</p>
        )}
      </div>
    </div>
  );
}

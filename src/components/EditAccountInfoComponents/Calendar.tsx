import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Plus } from "lucide-react";
import BookingList from "./BookingList";
import BookingForm from "./BookingForm";
import useBookingStore from "../../store/useCalendarBookings";
import "./CalendarStyles.css";
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const bookings = useBookingStore((state) => state.bookings);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const formatShortWeekday = (date: Date) => {
    const weekdays = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
    return weekdays[date.getDay()];
  };

  const navigationLabel = ({ date }: { date: Date }) => {
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateString = format(date, "yyyy-MM-dd");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureBookings = bookings.filter((booking) => {
      try {
        if (!booking || typeof booking !== "object") return false;
        if (!booking.from || typeof booking.from !== "string") return false;

        const [bookingDate] = booking.from.split("T");
        const bookingDateObj = new Date(bookingDate);
        bookingDateObj.setHours(0, 0, 0, 0);

        return bookingDateObj > today;
      } catch (error) {
        console.error("Error processing booking:", error);
        return false;
      }
    });

    let closestBookingDate: string | null = null;
    if (futureBookings.length > 0) {
      futureBookings.sort((a, b) => {
        const dateA = new Date(a.from.split("T")[0]);
        const dateB = new Date(b.from.split("T")[0]);
        return dateA.getTime() - dateB.getTime();
      });
      closestBookingDate = futureBookings[0].from.split("T")[0];
    }

    const hasBooking = bookings.some((booking) => {
      try {
        if (!booking || typeof booking !== "object") return false;
        if (!booking.from || typeof booking.from !== "string") return false;

        const [bookingDate] = booking.from.split("T");
        return bookingDate === dateString;
      } catch (error) {
        console.error("Error processing booking:", error);
        return false;
      }
    });

    if (!hasBooking) return null;

    if (
      closestBookingDate &&
      format(date, "yyyy-MM-dd") === closestBookingDate
    ) {
      return "red-highlight";
    }

    return "blue-highlight";
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="calendar-container rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setShowForm(true);
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add
            </button>
          </div>
          <Calendar
            onChange={onChange}
            value={value}
            formatShortWeekday={(_, date) => formatShortWeekday(date)}
            navigationLabel={navigationLabel}
            tileClassName={getTileClassName}
            prevLabel="<"
            nextLabel=">"
            prev2Label={null}
            next2Label={null}
            onClickDay={handleDateClick}
          />
        </div>

        <BookingList />

        <BookingForm
          isOpen={showForm}
          onClose={handleFormClose}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;

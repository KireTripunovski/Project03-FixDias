import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Plus } from "lucide-react";
import "./CalendarStyles.css";
import { isToday, isSameDay, startOfDay, parseISO } from "date-fns";
import useBookingStore from "../../../store/useCalendarBookings";
import BookingList from "./BookingList";
import BookingForm from "./BookingForm";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const bookings = useBookingStore((state) => state.bookings);
  const isLoading = useBookingStore((state) => state.isLoading);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(() => {
      fetchBookings();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
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

  const getNextBookingDate = () => {
    const today = startOfDay(new Date());

    const futureBookings = bookings.filter((booking) => {
      try {
        const bookingStartDate = parseISO(booking.from);
        return bookingStartDate > today && !isToday(bookingStartDate);
      } catch (error) {
        return false;
      }
    });

    if (futureBookings.length === 0) return null;

    futureBookings.sort((a, b) => {
      return parseISO(a.from).getTime() - parseISO(b.from).getTime();
    });

    return parseISO(futureBookings[0].from);
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const classes = [];

    if (isToday(date)) {
      classes.push("today-highlight");
    }

    const hasBooking = bookings.some((booking) => {
      try {
        const bookingDate = parseISO(booking.from);
        return isSameDay(bookingDate, date);
      } catch (error) {
        return false;
      }
    });

    if (hasBooking) {
      classes.push("booking-highlight");
    }

    const nextBookingDate = getNextBookingDate();
    if (nextBookingDate && isSameDay(date, nextBookingDate)) {
      classes.push("next-booking-highlight");
    }

    return classes.length > 0 ? classes.join(" ") : null;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    setShowDatePicker(false);
    setShowForm(true);
  };

  const handleAddButtonClick = () => {
    setSelectedDate(new Date());
    setShowDatePicker(true);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setShowDatePicker(false);
  };

  return (
    <div className=" my-15">
      <div className="max-w-3xl mx-auto">
        <div className="calendar-container rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
            <button
              onClick={handleAddButtonClick}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              disabled={isLoading}
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
          showDatePicker={showDatePicker}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;

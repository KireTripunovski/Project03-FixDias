import React, { createContext, useContext } from "react";
import { format, parseISO, isToday, isSameDay } from "date-fns";

interface DateTimeContextType {
  formatTime: (isoString: string) => string;
  formatDate: (date: Date | string) => string;
  formatDateHeading: (dateString: string) => {
    formattedDate: string;
    isToday: boolean;
  };
  isToday: (date: Date | number) => boolean;
  isSameDay: (dateLeft: Date | number, dateRight: Date | number) => boolean;
  parseISO: (dateString: string) => Date;
}

const DateTimeContext = createContext<DateTimeContextType | undefined>(
  undefined
);

export const DateTimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const formatTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return format(date, "h:mm a");
    } catch (e) {
      console.error("Error formatting time:", e);
      return "";
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      return format(dateObj, "EEEE, MMMM d");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  const formatDateHeading = (dateString: string) => {
    const date = new Date(dateString);
    return {
      formattedDate: format(date, "EEEE, MMMM d"),
      isToday: isToday(date),
    };
  };

  const value = {
    formatTime,
    formatDate,
    formatDateHeading,
    isToday,
    isSameDay,
    parseISO,
  };

  return (
    <DateTimeContext.Provider value={value}>
      {children}
    </DateTimeContext.Provider>
  );
};

export const useDateTimeContext = () => {
  const context = useContext(DateTimeContext);
  if (context === undefined) {
    throw new Error(
      "useDateTimeContext must be used within a DateTimeProvider"
    );
  }
  return context;
};

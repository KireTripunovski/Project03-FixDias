import { FiCalendar } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "../DashboardComponents/Dashboard.module.css";
import useBookingsStore from "../../store/BookingStore";
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/ProfileStore";

export default function BookingsSection() {
  const navigate = useNavigate();
  const { bookings, updateBookingStatus, fetchBookings } = useBookingsStore();
  const [activeTab, setActiveTab] = useState<"new" | "ongoing" | "completed">(
    "new"
  );

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthStore();
  const { fetchProfile } = useProfileStore();

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "new") return booking.status === "pending";
    if (activeTab === "ongoing") return booking.status === "accepted";
    return booking.status === "completed";
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (user) {
        await Promise.all([fetchProfile(), fetchBookings()]);
      }
      setIsLoading(false);
    };

    loadData();
  }, [user, fetchProfile, fetchBookings]);

  const handleBookingAction = async (
    bookingId: string,
    status: "accepted" | "rejected" | "completed",
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const success = await updateBookingStatus(bookingId, status);
      if (!success) {
        console.error(
          `Failed to update booking ${bookingId} to status ${status}`
        );
      }
    } catch (error) {
      console.error("Error in handleBookingAction:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div style={{ margin: "0 auto", width: "90%" }} className="py-7">
      <div style={{ marginBottom: "25px" }} className="flex justify-between ">
        <button
          style={{ paddingLeft: "0" }}
          className={`pb-2 px-1 text-sm font-medium ${
            activeTab === "new"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Requests{" "}
          {bookings.filter((b) => b.status === "pending").length > 0 &&
            `(${bookings.filter((b) => b.status === "pending").length})`}
        </button>
        <button
          className={`pb-2 px-1 text-sm font-medium ml-4 ${
            activeTab === "ongoing"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`pb-2 px-1 text-sm font-medium ml-4 ${
            activeTab === "completed"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No {activeTab} bookings found
        </div>
      ) : (
        filteredBookings.map((booking) => (
          <div
            style={{ marginBottom: "20px" }}
            key={booking.id}
            className={`border rounded-lg overflow-hidden  mb-2 ${
              booking.status === "completed"
                ? "border-green-500"
                : "border-gray-200"
            }`}
          >
            <div className="p-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-bold">{booking.description}</span>
                {(() => {
                  switch (booking.status) {
                    case "pending":
                      return (
                        <span
                          style={{ color: "#1461F0" }}
                          className={`text-xs ${styles.textUrgent}`}
                        >
                          Processing
                        </span>
                      );
                    case "accepted":
                      return (
                        <span
                          style={{ color: "#28A745" }}
                          className={`text-xs ${styles.textAccepted}`}
                        >
                          Accepted
                        </span>
                      );
                    case "completed":
                      return (
                        <span
                          style={{ color: "#38830A" }}
                          className={`text-xs ${styles.textCompleted}`}
                        >
                          <IoIosCheckmarkCircleOutline size={26} />
                        </span>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
            <div className="p-3">
              <div style={{ marginBottom: "30px" }}>
                <div className="flex items-center text-sm mb-2">
                  <span className="flex items-center font-medium mr-1">
                    <FiCalendar
                      style={{ marginRight: "5px", color: "#FA6100" }}
                    />
                    <span style={{ marginRight: "5px" }}>
                      {booking.status === "completed"
                        ? "Completed on"
                        : "Planned for"}
                    </span>
                    {booking.status === "completed"
                      ? booking.completedDate
                      : booking.scheduledDate}{" "}
                    <CiClock2
                      style={{
                        marginLeft: "15px",
                        marginRight: "5px",
                        color: "#FA6100",
                      }}
                    />
                    {booking.status === "completed"
                      ? booking.completedTime
                      : booking.scheduledTime}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="flex items-center text-sm font-medium">
                    <FaArrowsRotate
                      style={{ marginRight: "5px", color: "#FA6100" }}
                    />
                    {booking.description}
                  </span>
                  <span className="flex items-center text-sm font-medium mt-1">
                    <FaUserCog
                      style={{ marginRight: "5px", color: "#FA6100" }}
                    />
                    <div className="flex justify-between w-full items-center">
                      {booking.customerName}
                      <span
                        className="flex items-center text-sm font-medium"
                        style={{ marginRight: "70px" }}
                        onClick={() => navigate("/map")}
                      >
                        <LuMapPin style={{ color: "#FA6100" }} />
                        View location
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              {activeTab === "new" && (
                <div className="flex gap-2 mt-3">
                  <button
                    className={`flex-1 py-2 rounded-lg ${styles.bgPrimary} ${styles.textWhite}`}
                    type="button"
                    onClick={(e) =>
                      handleBookingAction(booking.id, "rejected", e)
                    }
                  >
                    Refuse
                  </button>
                  <button
                    className="flex-1 border border-gray-300 py-2 rounded-lg"
                    type="button"
                    onClick={(e) =>
                      handleBookingAction(booking.id, "accepted", e)
                    }
                  >
                    Accept
                  </button>
                </div>
              )}
              {activeTab === "ongoing" && (
                <div className="flex align-center justify-center mt-3">
                  <button
                    type="button"
                    className={`p-3 w-full text-center rounded-lg ${styles.bgPrimary} ${styles.refuse}`}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      handleBookingAction(booking.id, "completed", e);
                    }}
                  >
                    Refuse
                  </button>
                  <button
                    type="button"
                    className={`p-3 w-full text-center rounded-lg ${styles.bgPrimary} ${styles.textWhite}`}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      handleBookingAction(booking.id, "completed", e);
                    }}
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

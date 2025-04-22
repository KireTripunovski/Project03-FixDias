import { FiCalendar } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "../Dashboard.module.css";
import useBookingsStore from "../../../store/useBookingStore";
import useAuthStore from "../../../store/useAuthStore";
import useProfileStore from "../../../store/useProfileStore";
import Button from "../../../ui/Button";

export default function BookingsSection() {
  const navigate = useNavigate();
  const { bookings, updateBookingStatus, fetchBookings } = useBookingsStore();
  const [activeTab, setActiveTab] = useState<"new" | "ongoing" | "completed">(
    "new"
  );
  const [showAllBookings, setShowAllBookings] = useState(false);
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
      if (success && status === "completed") {
        await fetchProfile(); // Refresh profile to get updated completedJobs count
      }
      if (!success) {
        console.error(
          `Failed to update booking ${bookingId} to status ${status}`
        );
      }
    } catch (error) {
      console.error("Error in handleBookingAction:", error);
    }
  };

  const toggleShowAll = () => {
    setShowAllBookings((prevState) => !prevState);
  };

  const displayedListings = showAllBookings
    ? filteredBookings
    : filteredBookings.slice(0, 2);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Button variant="primary" loading={true}>
          Loading
        </Button>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto", width: "90%" }} className="py-7">
      <div style={{ marginBottom: "25px" }} className="flex justify-between">
        <Button
          variant="ghost"
          className={`pb-2 px-1 text-sm font-medium ${
            activeTab === "new"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Requests
          {bookings.filter((b) => b.status === "pending").length > 0 &&
            `(${bookings.filter((b) => b.status === "pending").length})`}
        </Button>
        <Button
          variant="ghost"
          className={`pb-2 px-1 text-sm font-medium ml-4 ${
            activeTab === "ongoing"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </Button>
        <Button
          variant="ghost"
          className={`pb-2 px-1 text-sm font-medium ml-4 ${
            activeTab === "completed"
              ? `border-b-2 ${styles.borderPrimary} ${styles.textactive}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </div>

      {displayedListings.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No {activeTab} bookings found
        </div>
      ) : (
        displayedListings.map((booking) => (
          <div
            style={{ marginBottom: "20px" }}
            key={booking.id}
            className={`border rounded-lg overflow-hidden mb-2 ${
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
                  <span className="flex items-center justify-between w-full font-medium mr-1">
                    <div className="flex items-center">
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
                        : booking.scheduledDate}
                    </div>
                    <div className="flex items-center">
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
                    </div>
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
                      <Button
                        variant="ghost"
                        size="small"
                        className="flex items-center text-sm font-medium cursor-pointer hover:underline p-0"
                        onClick={() =>
                          navigate(
                            `/map?lat=${booking.location.lat}&lng=${
                              booking.location.lng
                            }&address=${encodeURIComponent(
                              booking.location.address
                            )}&description=${encodeURIComponent(
                              booking.description
                            )}`
                          )
                        }
                      >
                        <LuMapPin
                          style={{ color: "#FA6100", marginRight: "5px" }}
                        />
                        View location
                      </Button>
                    </div>
                  </span>
                </div>
              </div>
              {activeTab === "new" && (
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    fullWidth
                    className={`py-2  ${styles.refuse}`}
                    onClick={(e) =>
                      handleBookingAction(booking.id, "rejected", e)
                    }
                  >
                    Refuse
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-orange-300 bg-orange-500 text-white py-2"
                    onClick={(e) =>
                      handleBookingAction(booking.id, "accepted", e)
                    }
                  >
                    Accept
                  </Button>
                </div>
              )}
              {activeTab === "ongoing" && (
                <div className="flex align-center justify-center gap-2 mt-3">
                  <Button
                    variant="danger"
                    fullWidth
                    className={`p-3 text-center ${styles.refuse}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookingAction(booking.id, "rejected", e);
                    }}
                  >
                    Refuse
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    className={`p-3 text-center ${styles.textWhite}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookingAction(booking.id, "completed", e);
                    }}
                  >
                    Completed
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {filteredBookings.length > 2 && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="small"
            className="p-2"
            onClick={toggleShowAll}
          >
            {showAllBookings ? "Show less" : "Show all"}
          </Button>
        </div>
      )}
    </div>
  );
}

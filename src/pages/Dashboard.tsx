import { useEffect, useState } from "react";
import { Bell, Edit2, Eye, Star } from "lucide-react";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import useAuthStore from "../store/authStore";
import useProfileStore from "../store/ProfileStore";
import useBookingsStore from "../store/BookingStore";
import EditableSection from "../components/DashboardComponents/EditableSection";
import useUserPreferencesStore from "../store/useUserPreferences";
import FeedbackSection from "../components/DashboardComponents/FeedbackSection";
import profilepicutre from "../../public/Profile/Profile picture of handyman.png";
import verirified from "../../public/Profile/verified_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24 1.png";
import useFeedbackStore from "../store/FeedbackStore";
import CarouselSlider from "../components/DashboardComponents/Carousel";
import carouselimg1 from "../../public/Profile/plumbing-repair-service 1.png";
import carouselimg2 from "../../public/Profile/male-hands-with-wrench-turning-off-valves 1.png";
import MyListings from "../components/DashboardComponents/Mylistings";
import BookingsSection from "../components/DashboardComponents/Booking";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { profile, fetchProfile, updateProfile } = useProfileStore();
  const { fetchBookings } = useBookingsStore();
  const { preferences, fetchUserPreferences } = useUserPreferencesStore();
  const { averageRating, reviewCount, fetchFeedback } = useFeedbackStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetchFeedback(user.id);
    }
  }, [user, fetchFeedback]);

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
  useEffect(() => {
    if (user) {
      fetchUserPreferences(user.id);
    }
  }, [user, fetchUserPreferences]);

  const handleUpdateAbout = async (content: string) => {
    await updateProfile({ about: content });
  };

  const handleUpdateServices = async (content: string) => {
    await updateProfile({ services: content });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white mx-auto ">
      <div className="width-90">
        {/* Header */}
        <header className="flex justify-between items-center ">
          <h1 className={`font-medium text-lg ${styles.textPrimary}`}>
            My profiles
          </h1>
          <button className={styles.textAccent}>
            <Bell size={20} />
          </button>
        </header>

        {/* Profile Card */}
        <div className=" py-2">
          <div className="rounded-lg overflow-hidden">
            <div>
              <img
                src={profilepicutre}
                alt="Profile image"
                className="w-full h-48 object-cover"
              />
            </div>
            <div
              style={{ paddingTop: "15px", paddingBottom: "15px" }}
              className="bg-white rounded-lg"
            >
              <div className="flex items-center gap-15 ">
                <span className="font-bold ">
                  {user?.name || "User Name"}
                  <img
                    src={verirified}
                    alt="verirified"
                    className="inline-block"
                  />
                </span>
                <div>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full   ${styles.bgAccentLight} ${styles.textAccentLight}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${styles.dotAccent}`}
                    ></span>
                    Available now
                  </span>
                  <button className="bg-white p-1 rounded-full inline-block px-2">
                    <Edit2 size={16} className={styles.textAccent} />
                  </button>
                </div>
              </div>

              <div className="flex items-center text-xs text-gray-600">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  if (starValue <= averageRating) {
                    return (
                      <Star
                        key={starValue}
                        size={16}
                        fill="#f5ce47"
                        className={styles.starFilled}
                      />
                    );
                  } else if (starValue - 0.5 <= averageRating) {
                    return (
                      <div key={starValue} className="relative">
                        <div
                          className="absolute overflow-hidden"
                          style={{ width: "50%" }}
                        >
                          <Star
                            size={16}
                            fill="#f5ce47"
                            className={styles.starFilled}
                          />
                        </div>
                        <Star
                          size={16}
                          fill="#e2e8f0"
                          className="text-gray-300"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <Star
                        key={starValue}
                        size={16}
                        fill="#e2e8f0"
                        className="text-gray-300"
                      />
                    );
                  }
                })}
                {reviewCount} reviews
              </div>
              <div>
                <p>
                  {preferences?.selectedCategories?.map((category, index) => (
                    <span key={index}>{category.categoryName}</span>
                  )) || "No categories selected"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Section Button */}
        <div className="flex py-2">
          <button className="w-full border border-gray-300 rounded-lg py-2.5 text-center text-gray-700">
            Add section
          </button>
          <button
            onClick={() => navigate("/dashboard/editaccount")}
            className="px-5 block"
          >
            ...
          </button>
        </div>

        {/* Pro Try Button */}
        <div className=" py-2">
          <button
            className={`w-full rounded-lg py-3 text-center font-medium flex items-center justify-center ${styles.bgSecondary}`}
          >
            <Star size={16} className="mr-1" fill="black" />
            Pro try
          </button>
        </div>

        <EditableSection
          title="About me"
          content={profile?.about || ""}
          onSave={handleUpdateAbout}
        />

        <EditableSection
          title="Service"
          content={profile?.services || ""}
          onSave={handleUpdateServices}
        />
      </div>

      <div className="width-90">
        <div>
          <h2 className="text-lg font-medium">My bookings</h2>
          <span
            style={{ color: "#1461F0", display: "flex" }}
            className="text-xs text-gray-500"
          >
            <Eye
              size={16}
              style={{ marginRight: "5px", marginBottom: "15px" }}
            />
            Only you can see this
          </span>
        </div>
      </div>
      <BookingsSection />

      <MyListings />
      <CarouselSlider autoPlay={false} showDots peekAmount={20}>
        {[
          <div key="1">
            <img
              src={carouselimg1}
              alt="Slide 1"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="2">
            <img
              src={carouselimg2}
              alt="Slide 2"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="3">
            <img
              src={carouselimg1}
              alt="Slide 3"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="4">
            <img
              src={carouselimg2}
              alt="Slide 4"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="5">
            <img
              src={carouselimg1}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="6">
            <img
              src={carouselimg2}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="1">
            <img
              src={carouselimg1}
              alt="Slide 1"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="2">
            <img
              src={carouselimg2}
              alt="Slide 2"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="3">
            <img
              src={carouselimg1}
              alt="Slide 3"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="4">
            <img
              src={carouselimg2}
              alt="Slide 4"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="5">
            <img
              src={carouselimg1}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="6">
            <img
              src={carouselimg2}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="1">
            <img
              src={carouselimg1}
              alt="Slide 1"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="2">
            <img
              src={carouselimg2}
              alt="Slide 2"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="3">
            <img
              src={carouselimg1}
              alt="Slide 3"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="4">
            <img
              src={carouselimg2}
              alt="Slide 4"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="5">
            <img
              src={carouselimg1}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
          <div key="6">
            <img
              src={carouselimg2}
              alt="Slide 5"
              style={{ width: "100%", height: "255px", objectFit: "cover" }}
            />
          </div>,
        ]}
      </CarouselSlider>
      <FeedbackSection />
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { Bell, Edit2, Eye, Plus, Star } from "lucide-react";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import useAuthStore from "../store/useAuthStore";
import useProfileStore from "../store/useProfileStore";
import useBookingsStore from "../store/useBookingStore";
import EditableSection from "../components/DashboardComponents/EditableSection";
import useUserPreferencesStore from "../store/useUserPreferences";
import FeedbackSection from "../components/DashboardComponents/Feedback/FeedbackSection";
import profilepicutre from "../../public/Profile/Profile picture of handyman.png";
import verirified from "../../public/Profile/verified_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24 1.png";
import useFeedbackStore from "../store/useFeedbackStore";
import CarouselSlider from "../components/DashboardComponents/Carousel/Carousel";
import carouselimg1 from "../../public/Profile/plumbing-repair-service 1.png";
import carouselimg2 from "../../public/Profile/male-hands-with-wrench-turning-off-valves 1.png";
import BookingsSection from "../components/DashboardComponents/Booking/Booking";
import { useNavigate } from "react-router";
import { FooterActions } from "../components/EditAccountInfoComponents/FooterActions";
import CustomSections from "../components/DashboardComponents/CostumSections";
import AddSectionModal from "../components/DashboardComponents/AddSectionModal";
import StarRating from "../ui/StarRating";
import MyListings from "../components/DashboardComponents/MyListings/Mylistings";
import { setError } from "../utils/Error";
import { FaLocationPin } from "react-icons/fa6";
import { BsFillBagCheckFill } from "react-icons/bs";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { profile, fetchProfile, updateProfile } = useProfileStore();
  const { fetchBookings } = useBookingsStore();
  const { averageRating, reviewCount, fetchFeedback } = useFeedbackStore();
  const { preferences, fetchUserPreferences } = useUserPreferencesStore();
  const navigate = useNavigate();

  // local state
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if (user?.id) {
          await Promise.all([
            fetchProfile(),
            fetchBookings(),
            fetchFeedback(user.id),
            fetchUserPreferences(user.id),
          ]);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, fetchProfile, fetchBookings, fetchFeedback, fetchUserPreferences]);

  // handlers
  const handleUpdateAbout = useCallback(
    async (content: string) => {
      await updateProfile({ about: content });
    },
    [updateProfile]
  );

  const handleUpdateServices = useCallback(
    async (content: string) => {
      await updateProfile({ services: content });
    },
    [updateProfile]
  );
  const handleAddSection = useCallback(
    async (sectionName: string) => {
      const currentCustomSections = profile?.customSections || {};
      const updatedCustomSections = {
        ...currentCustomSections,
        [sectionName]: "",
      };

      await updateProfile({
        customSections: updatedCustomSections,
      });
    },
    [profile, updateProfile]
  );

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
              <div className="flex items-center justify-between ">
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
                    Available now
                  </span>
                  <button className="bg-white rounded-full inline-block ">
                    <Edit2 size={16} className={styles.textAccent} />
                  </button>
                </div>
              </div>

              <StarRating
                filledClassName={styles.starFilled}
                rating={averageRating}
                reviewCount={reviewCount}
              />
              <div style={{ fontSize: "12px" }}>
                <div className=" flex flex-col gap-2 my-5">
                  <div className="flex items-center gap-2">
                    <FaLocationPin className="text-orange-500" />
                    {profile?.location?.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillBagCheckFill className="text-orange-500" />
                    {profile?.completedJobs} Completed Orders
                  </div>
                </div>
              </div>
              <div>
                <p>
                  {preferences?.selectedCategories?.map((category, index) => (
                    <span style={{}} key={index}>
                      {category.subcategories.map((sub, subIndex) => (
                        <span
                          style={{
                            color: "rgba(85, 132, 229, 1)",
                            backgroundColor: "rgba(232, 239, 254, 1)",
                            padding: "5px",
                            borderRadius: "5px",
                            fontSize: "12px",
                            margin: "10px 5px 0px 0",
                            display: "inline-block",
                          }}
                          key={subIndex}
                        >
                          {sub.name}
                        </span>
                      ))}
                    </span>
                  )) || "No categories selected"}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Add Section Button */}
        <div className="flex py-2">
          <button
            style={{ border: "1px solid rgba(250, 97, 0, 1)" }}
            className="w-full rounded-lg py-2.5 text-center bg-white text-gray-700 flex items-center justify-center"
            onClick={() => setIsAddSectionModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Add section
          </button>
          <div className="relative self-center">
            <button
              onClick={toggleDropdown}
              className="px-5 block flex items-center gap-1 "
            >
              ...
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-gray ring-opacity-5">
                <div className="py-1 w-full">
                  <button
                    onClick={() => navigate("/dashboard/editaccount")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Account
                  </button>
                  <button
                    onClick={() =>
                      navigate("/dashboard/editaccount?tab=calendar")
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Calendar
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Homepage
                  </button>
                  <button
                    onClick={() =>
                      console.log("Become Pro to be implemented in the future")
                    }
                    className="flex items-center px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100"
                  >
                    Become Pro
                    <Star
                      size={19}
                      style={{
                        marginLeft: "15px",
                        backgroundColor: "rgba(220, 253, 63, 1)",
                        padding: "5px",
                        borderRadius: "50%",
                      }}
                      fill="black"
                    />
                  </button>
                  <div
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05) " }}
                  ></div>
                  <button
                    onClick={() => navigate("/dashboard/saveditems")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Saved Items
                  </button>
                  <button
                    onClick={() => console.log("Logout")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Activity
                  </button>
                  <div
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05) " }}
                  ></div>
                  <FooterActions
                    onLogout={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="px-4 py-2 block text-sm items-start"
                  />
                </div>
              </div>
            )}
          </div>
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
        <CustomSections />
      </div>

      <div className="width-90 pt-15">
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
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}

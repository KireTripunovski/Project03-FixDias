import { useState, useEffect } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import useAuthStore from "../store/authStore";
import useUserPreferencesStore from "../store/useUserPreferences";
import profilepicture from "../../public/Profile/Picture.png";
import CalendarComponent from "../components/EditAccountInfoComponents/Calendar";
import { AccountDetails } from "../components/EditAccountInfoComponents/AccountDetails";
import { ContactDetails } from "../components/EditAccountInfoComponents/ContactDetails";
import { CertificatesSection } from "../components/EditAccountInfoComponents/CertificatesSection";
import { PasswordSection } from "../components/EditAccountInfoComponents/PasswordSection";
import { IndustrialSection } from "../components/EditAccountInfoComponents/IndustrialSection";
import { NotificationPreferences } from "../components/EditAccountInfoComponents/NotificationPreferences";
import { ActionButtons } from "../components/EditAccountInfoComponents/ActionButtons";
import { FooterActions } from "../components/EditAccountInfoComponents/FooterActions";
import { LocationModal } from "../components/EditAccountInfoComponents/LocationModal";
import { TelephoneModal } from "../components/EditAccountInfoComponents/TelephoneModal";
import { CertificatesModal } from "../components/EditAccountInfoComponents/CertificatesModal";
import useProfileStore, {
  HandymanProfile,
  Location,
} from "../store/ProfileStore";

interface CustomFormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string | null;
  telephone: string | null;
  certificates: string | null;
  password: string;
  industrial: string;
}

export default function EditAccount() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "edit";
  const navigate = useNavigate();
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [telephoneModalOpen, setTelephoneModalOpen] = useState(false);
  const [certificatesModalOpen, setCertificatesModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState<Location>({
    state: "",
    city: "",
    zipCode: "",
    coordinates: { latitude: 0, longitude: 0 },
  } as Required<Location>);
  const [newTelephone, setNewTelephone] = useState("");
  const [newCertificates, setNewCertificates] = useState("");
  const { user, logout } = useAuthStore();
  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (coords) {
      setNewLocation((prev) => ({
        ...prev,
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      }));
    }
  }, [coords]);

  const {
    profile,
    fetchProfile,
    updateProfile,
    updateLocation,
    updateCertifications,
    updatePhoneNumber,
  } = useProfileStore();
  const { preferences, fetchUserPreferences } = useUserPreferencesStore();

  const [formData, setFormData] = useState<CustomFormData>({
    firstName: "",
    lastName: "",
    email: "",
    location: null,
    telephone: null,
    certificates: null,
    password: "*****************",
    industrial: "",
  });

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name?.split(" ") || ["", ""];

      setFormData((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        telephone: user.phoneNumber || null,
      }));

      fetchProfile();
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (user) {
      fetchUserPreferences(user.id);
    }
  }, [user, fetchUserPreferences]);

  const industrialDisplay =
    preferences?.selectedCategories
      ?.map((category) => category.categoryName)
      .join(", ") ||
    formData.industrial ||
    "No profession set";

  useEffect(() => {
    if (profile) {
      const locationDisplay =
        profile.location?.displayString ||
        (profile.location?.city && profile.location?.state
          ? `${profile.location.city}, ${profile.location.state}`
          : null);

      setFormData((prev) => ({
        ...prev,
        certificates: profile.certifications?.join(", ") || null,
        industrial: profile.profession || "",
        location: locationDisplay,
      }));

      if (profile.location) {
        setNewLocation(profile.location);
      }

      if ((profile.certifications ?? []).length > 0) {
        setNewCertificates((profile.certifications ?? []).join(", "));
      }
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    const updatedProfile: Partial<HandymanProfile> = {
      profession: formData.industrial,
      certifications: formData.certificates
        ? formData.certificates.split(", ")
        : [],
      location: profile?.location,
    };

    const result = await updateProfile(updatedProfile);
    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile: " + result.message);
    }
  };

  const handleLocationSave = async () => {
    if (!newLocation.city || !newLocation.state) {
      alert("Please enter both city and state.");
      return;
    }

    const result = await updateLocation(newLocation);
    if (result.success) {
      setLocationModalOpen(false);
      fetchProfile();
    } else {
      alert("Failed to update location: " + result.message);
    }
  };

  const handleTelephoneSave = async () => {
    if (!newTelephone.trim()) {
      alert("Please enter a valid telephone number.");
      return;
    }

    const result = await updatePhoneNumber(newTelephone);
    if (result.success) {
      setTelephoneModalOpen(false);
      setFormData((prev) => ({ ...prev, telephone: newTelephone }));
    } else {
      alert("Failed to update telephone number: " + result.message);
    }
  };

  const handleCertificatesSave = async () => {
    if (!newCertificates.trim()) {
      alert("Please enter at least one certificate.");
      return;
    }

    const certificatesArray = newCertificates
      .split(",")
      .map((cert) => cert.trim());
    const result = await updateCertifications(certificatesArray);

    if (result.success) {
      setCertificatesModalOpen(false);
      setFormData((prev) => ({ ...prev, certificates: newCertificates }));
      fetchProfile();
    } else {
      alert("Failed to update certificates: " + result.message);
    }
  };

  const useCurrentLocation = () => {
    if (coords) {
      setNewLocation((prev) => ({
        ...prev,
        city: "Current City",
        state: "Current State",
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      }));
    } else {
      alert(
        "Location data is not available yet. Please wait or enter manually."
      );
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Please log in to view this page
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <button className="p-1" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-[#ff6600]">
          {activeTab === "edit" ? "Edit account" : "Calendar"}
        </h1>
        <button className="p-1">
          <Bell className="h-6 w-6 text-gray-800" />
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: 50, height: 50 }}
        >
          <img
            src={profilepicture}
            alt="Profile picture"
            className="object-cover w-full h-full"
          />
          <div
            style={{ backgroundColor: "rgba(217, 217, 217, 0.8)" }}
            className="absolute bottom-0 w-full h-1/2 bg-gray-500/70 flex items-center justify-center"
          >
            <span
              style={{ backgroundColor: "transparent" }}
              className="text-black text-xs"
            >
              Edit
            </span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex mt-6 border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "edit"
              ? "text-[#ff6600] border-b-2 border-[#ff6600]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit account
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "calendar"
              ? "text-[#ff6600] border-b-2 border-[#ff6600]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
      </div>

      {activeTab === "edit" ? (
        <div className="px-4 py-4 space-y-4">
          {/* Account Details */}
          <AccountDetails
            firstName={formData.firstName}
            lastName={formData.lastName}
            email={formData.email}
          />

          {/* Contact Details */}
          <ContactDetails
            location={formData.location}
            telephone={formData.telephone}
            onOpenLocationModal={() => setLocationModalOpen(true)}
            onOpenTelephoneModal={() => setTelephoneModalOpen(true)}
          />

          {/* Certificates Section */}
          <CertificatesSection
            certificates={formData.certificates}
            onOpenCertificatesModal={() => setCertificatesModalOpen(true)}
          />

          {/* Password Section */}
          <PasswordSection />

          {/* Industrial Section */}
          <IndustrialSection industrialDisplay={industrialDisplay} />

          {/* Notification Preferences */}
          <NotificationPreferences />

          {/* Action Buttons */}
          <ActionButtons onCancel={() => navigate(-1)} onSave={handleSave} />

          {/* Footer Actions */}
          <FooterActions
            onLogout={() => {
              logout();
              navigate("/login");
            }}
          />
        </div>
      ) : (
        <div className="width-90">
          <CalendarComponent />
        </div>
      )}

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
        useCurrentLocation={useCurrentLocation}
        onSave={handleLocationSave}
      />

      {/* Telephone Modal */}
      <TelephoneModal
        isOpen={telephoneModalOpen}
        onClose={() => setTelephoneModalOpen(false)}
        newTelephone={newTelephone}
        setNewTelephone={setNewTelephone}
        onSave={handleTelephoneSave}
      />

      {/* Certificates Modal */}
      <CertificatesModal
        isOpen={certificatesModalOpen}
        onClose={() => setCertificatesModalOpen(false)}
        newCertificates={newCertificates}
        setNewCertificates={setNewCertificates}
        onSave={handleCertificatesSave}
      />
    </div>
  );
}

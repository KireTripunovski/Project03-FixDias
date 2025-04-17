import { Star, Eye, MapPin, Bookmark } from "lucide-react";
import styles from "./MyListing.module.css";
import image from "../../../public/Profile/Picture.png";
import checkmark from "../../../public/Profile/verified_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24 1.png";
import useFeedbackStore from "../../store/FeedbackStore";
import useListingsStore from "../../store/ListingStore";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useAuthStore from "../../store/authStore";
import JobForm from "./JobForm";

export default function MyListings() {
  const { averageRating, reviewCount } = useFeedbackStore();
  const { listings } = useListingsStore();
  const [showForm, setShowForm] = useState(false);
  const [showAllListings, setShowAllListings] = useState(false);
  const { user } = useAuthStore();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleShowAll = () => {
    setShowAllListings(!showAllListings);
  };

  const displayedListings = showAllListings ? listings : listings.slice(0, 2);

  return (
    <div className={`${styles.container} width-90`}>
      {listings.length > 2 && (
        <div className="flex justify-end ">
          <button
            style={{ textAlign: "right" }}
            onClick={toggleShowAll}
            className={styles.toggleListingsButton}
          >
            {showAllListings ? "Show less" : "Show all"}
          </button>
        </div>
      )}
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.headerSection}>
            <div className={styles.iconCircle}>
              <Star className={styles.starIcon} />
            </div>
            <span className={styles.featureText}>Per feature</span>
          </div>

          <div className={styles.mainHeaderSection}>
            <h1 className={styles.mainHeading}>My listings</h1>
            <button className={styles.buttonCreate} onClick={toggleForm}>
              {showForm ? "Cancel" : "Create post"}
            </button>
          </div>

          <p className={styles.explanatoryText}>
            {user?.name.split(" ")[0]}, this is a pro feate. <br /> Your
            listings would appear here and in
            <span className={styles.underlinedText}>Home</span>
          </p>

          <div className={styles.previewSection}>
            <Eye className={styles.eyeIcon} />
            <span className={styles.previewText}>Preview</span>
          </div>

          {showForm && <JobForm onSuccess={() => setShowForm(false)} />}

          {displayedListings.map((listing, index) => (
            <div key={index} className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <img
                  src={image}
                  alt="Profile picture"
                  className={styles.profileImage}
                />
                <div className={styles.profileInfo}>
                  <div className={styles.nameSection}>
                    <h2 className={styles.profileName}>
                      {user ? user.name : "User"}
                    </h2>
                    <img src={checkmark} alt="checkmark" />
                    <div className={styles.availabilityPill}>Available now</div>
                    <Bookmark className={styles.bookmarkIcon} />
                  </div>
                  <div className={styles.ratingSection}>
                    <div className={styles.stars}>
                      <span className={styles.ratingNumber}>
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
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.jobSection}>
                <h3 className={styles.jobTitle}>{listing.title}</h3>
                <span className={styles.timeAgo}>
                  {" "}
                  {formatDistanceToNow(new Date(listing.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className={styles.description}>{listing.description}</p>

              <div className={styles.locationSection}>
                <MapPin className={styles.locationIcon} />
                <span>{listing.location.state}</span>
              </div>

              <div className={styles.actionsSection}>
                <button className={styles.showProfileButton}>
                  Show profile
                </button>
                <button className={styles.contactButton}>Contact</button>
              </div>
            </div>
          ))}

          {listings.length === 0 && !showForm && (
            <div className={styles.emptyState}>
              You don't have any listings yet. Create your first one!
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Star className={styles.footerStarIcon} />
          <span className={styles.footerText}>Pro try</span>
        </div>
      </div>
    </div>
  );
}

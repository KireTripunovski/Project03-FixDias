import { Star, Eye, MapPin, Bookmark } from "lucide-react";
import styles from "./MyListing.module.css";
import image from "../../../../public/Profile/Picture.png";
import checkmark from "../../../../public/Profile/verified_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24 1.png";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import useFeedbackStore from "../../../store/useFeedbackStore";
import useAuthStore from "../../../store/useAuthStore";
import useListingsStore, { Listing } from "../../../store/useListingStore";
import Button from "../../../ui/Button";
import JobForm from "./JobForm";
import StarRating from "../../../ui/StarRating";

export default function MyListings() {
  const { averageRating, reviewCount } = useFeedbackStore();
  const { listings, fetchListings } = useListingsStore();
  const [showForm, setShowForm] = useState(false);
  const [showAllListings, setShowAllListings] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    console.log("Fetching listings...");
    fetchListings()
      .then(() => console.log("Listings fetched successfully"))
      .catch((err) => console.error("Error fetching listings:", err));
  }, [fetchListings]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleShowAll = () => {
    setShowAllListings(!showAllListings);
  };

  const displayedListings = showAllListings ? listings : listings.slice(0, 2);

  return (
    <div className={`${styles.container} width-90 pt-15`}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.headerSection}>
            <div className={styles.iconCircle}>
              <Star className={styles.footerStarIcon} />
            </div>
            <span className={styles.featureText}>Per feature</span>
          </div>

          <div className={styles.mainHeaderSection}>
            <h1 className={styles.mainHeading}>My listings</h1>
            <Button
              onClick={toggleForm}
              variant={showForm ? "outline" : "primary"}
              className={styles.buttonCreate}
            >
              {showForm ? "Cancel" : "Create post"}
            </Button>
          </div>

          <p className={styles.explanatoryText}>
            {user?.name.split(" ")[0]}, this is a pro feature. <br /> Your
            listings would appear here and in
            <Link to={"/"} className={styles.underlinedText}>
              Home
            </Link>
          </p>

          <div className={styles.previewSection}>
            <Eye className={styles.eyeIcon} />
            <span className={styles.previewText}>Preview</span>
          </div>

          {showForm && <JobForm onSuccess={() => setShowForm(false)} />}

          {displayedListings.map((listing: Listing, index: number) => (
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
                        <StarRating
                          rating={averageRating}
                          reviewCount={reviewCount}
                          filledClassName={styles.starIcon}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.jobSection}>
                <h3 className={styles.jobTitle}>{listing.title}</h3>
                <span className={styles.timeAgo}>
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
                <Button
                  variant="outline"
                  className={`hover:border-orange-200 ${styles.showProfileButton}`}
                >
                  Show profile
                </Button>
                <Button variant="primary" className={styles.contactButton}>
                  Contact
                </Button>
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
      {listings.length > 2 && (
        <div className="flex justify-end my-5">
          <Button variant="primary" onClick={toggleShowAll} className="mt-2.5">
            {showAllListings ? "Show less" : "Show all"}
          </Button>
        </div>
      )}
    </div>
  );
}

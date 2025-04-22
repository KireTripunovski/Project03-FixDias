// ProfileCard.tsx
import { Edit2 } from "lucide-react";
import styles from "../components/DashboardComponents/Dashboard.module.css";
import { User } from "../../../types/types";
import { HandymanProfile } from "../../../store/useProfileStore";
import StarRating from "../../../ui/StarRating";

interface ProfileCardProps {
  user: User | null;
  profile: HandymanProfile | null;
  profilePicture: string;
  verifiedIcon: string;
  averageRating: number;
  reviewCount: number;
}

export default function ProfileCard({
  user,
  profile,
  profilePicture,
  verifiedIcon,
  averageRating,
  reviewCount,
}: ProfileCardProps) {
  return (
    <div className="py-2">
      <div className="rounded-lg overflow-hidden">
        <div>
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg py-4">
          <div className="flex items-center justify-between">
            <span className="font-bold">
              {user?.name || "User Name"}
              <img src={verifiedIcon} alt="verified" className="inline-block" />
            </span>
            <div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${styles.bgAccentLight} ${styles.textAccentLight}`}
              >
                Available now
              </span>
              <button className="bg-white rounded-full inline-block">
                <Edit2 size={16} className={styles.textAccent} />
              </button>
            </div>
          </div>

          <StarRating
            filledClassName={styles.starFilled}
            rating={averageRating}
            reviewCount={reviewCount}
          />

          <div>
            <p>
              {profile?.serviceCategories?.map((category, index) => (
                <span key={index}>
                  {category.subcategories.map((sub, subIndex) => (
                    <span className={styles.categoryTag} key={subIndex}>
                      {sub.name}
                    </span>
                  ))}
                </span>
              )) || "No categories selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

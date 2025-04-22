import { useEffect } from "react";
import styles from "../Dashboard.module.css";
import useFeedbackStore from "../../../store/useFeedbackStore";
import useAuthStore from "../../../store/useAuthStore";
import profilepiture from "../../../../public/Profile/Low-Fi Avatar.png";
import StarRating from "../../../ui/StarRating";

interface FeedbackSectionProps {
  handymanId?: string | null;
}

const FeedbackSection = ({ handymanId }: FeedbackSectionProps) => {
  const { feedback, isLoading, error, fetchFeedback } = useFeedbackStore();
  const authUser = useAuthStore((state) => state.user);

  const targetHandymanId =
    handymanId || (authUser?.userType === "handyman" ? authUser.id : null);

  useEffect(() => {
    if (targetHandymanId) {
      fetchFeedback(targetHandymanId);
    }
  }, [targetHandymanId, fetchFeedback]);

  if (isLoading) {
    return <div className="text-center py-4">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-15 width-90">
      <h2
        style={{
          fontWeight: "700",
          fontSize: "24px",
          lineHeight: "30px",
        }}
        className="text-lg font-medium mb-2"
      >
        Customer feedback
      </h2>

      {feedback.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No feedback yet</div>
      ) : (
        feedback.map((item) => (
          <div key={`${item.id}-${item.customerName}`} className="mb-4 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center py-2">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 ">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={profilepiture}
                    alt="profilepiture"
                  />
                </div>
                <span className="font-medium px-3">{item.customerName}</span>
              </div>
              <span style={{ color: "#FA6100" }} className={`text-sm `}>
                {item.location}
              </span>
            </div>
            <div className="mb-1 py-2">
              <StarRating
                rating={item.rating}
                filledClassName={styles.starFilled}
                className="flex"
              />
            </div>
            <p
              style={{ wordWrap: "break-word" }}
              className="text-sm text-gray-600 py-2"
            >
              {item.comment}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackSection;

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starSize?: number;
  filledColor?: string;
  emptyColor?: string;
  className?: string;
  filledClassName?: string;
  emptyClassName?: string;
  reviewCount?: number;
}

const StarRating = ({
  rating,
  maxRating = 5,
  starSize = 16,
  filledColor = "#f5ce47",
  emptyColor = "#e2e8f0",
  className = "flex items-center text-xs text-gray-600",
  filledClassName = "",
  emptyClassName = "text-gray-300",
  reviewCount,
}: StarRatingProps) => {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <div className={className}>
      {stars.map((starValue) => {
        if (starValue <= rating) {
          return (
            <Star
              key={starValue}
              size={starSize}
              fill={filledColor}
              className={filledClassName}
            />
          );
        } else if (starValue - 0.5 <= rating) {
          return (
            <div key={starValue} className="relative">
              <div
                className="absolute overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star
                  size={starSize}
                  fill={filledColor}
                  className={filledClassName}
                />
              </div>
              <Star
                size={starSize}
                fill={emptyColor}
                className={emptyClassName}
              />
            </div>
          );
        } else {
          return (
            <Star
              key={starValue}
              size={starSize}
              fill={emptyColor}
              className={emptyClassName}
            />
          );
        }
      })}
      {reviewCount !== undefined && ` ${reviewCount} reviews`}
    </div>
  );
};

export default StarRating;

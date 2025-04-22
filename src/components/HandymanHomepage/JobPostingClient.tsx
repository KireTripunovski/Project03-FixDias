import React from "react";
import { MapPin, ChevronDown, Star } from "lucide-react";
import { JobPosting } from "../../store/useJobPostingStore";
import { useNavigate } from "react-router";
import Button from "../../ui/Button";

interface JobPostingCardProps {
  posting: JobPosting;
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({ posting }) => {
  const navigate = useNavigate();
  const daysAgo = Math.floor(
    (Date.now() - new Date(posting.postedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div
              style={{ marginRight: "15px" }}
              className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3 mx-2"
            >
              <img
                src={posting.image}
                alt={posting.clientName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {posting.clientName}
              </h3>
              <p className="text-xs text-gray-500">Posted {daysAgo} days ago</p>
            </div>
          </div>
          {posting.isUrgent && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
              URGENT
            </span>
          )}
          <button className="text-blue-500">
            <Star size={20} />
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-2">{posting.title}</h2>

        <p className="text-gray-700 mb-3 line-clamp-2">{posting.description}</p>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1 color-blue" />
          <span className="text-sm">{posting.location.address}</span>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="small"
            onClick={() =>
              navigate(
                `/map?lat=${posting.location.lat}&lng=${
                  posting.location.lng
                }&address=${encodeURIComponent(
                  posting.location.address
                )}&description=${encodeURIComponent(posting.description)}`
              )
            }
            style={{ color: "#1461F0" }}
          >
            View on map
          </Button>
          <Button variant="primary" size="small">
            Contact
          </Button>
        </div>
      </div>

      <div className="flex justify-center border-t border-gray-200 width-90 p-2">
        <Button variant="ghost" className="text-gray-500 p-1">
          <ChevronDown size={20} />
        </Button>
      </div>
    </div>
  );
};

export default JobPostingCard;

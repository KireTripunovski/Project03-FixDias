import { useEffect, useState } from "react";
import useJobPostingStore, { JobPosting } from "../../store/useJobPostingStore";
import JobPostingCard from "../HandymanHomepage/JobPostingClient";
import Button from "../../ui/Button";
import { useNavigate } from "react-router";

const LatestJobPosting = () => {
  const fetchPosts = useJobPostingStore((state) => state.fetchPosts);
  const getLatestPost = useJobPostingStore((state) => state.getLatestPost);
  const posts = useJobPostingStore((state) => state.posts);
  const [latestPost, setLatestPost] = useState<JobPosting | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const latest = getLatestPost();
    setLatestPost(latest);
  }, [posts, getLatestPost]);

  return (
    <div className="my-15  rounded ">
      <h1 className="h1-headline text-center font-bold mb-4">
        Latest job offers - access now!
      </h1>
      {latestPost ? (
        <div style={{ marginBottom: "55px" }} className="mb-4">
          <JobPostingCard posting={latestPost} />
        </div>
      ) : (
        <p className="text-gray-500">No job postings available.</p>
      )}
      <div>
        <Button
          onClick={() => navigate("/handymanhomepage")}
          style={{ padding: "10px 10px", width: "100%" }}
        >
          Find Jobs
        </Button>
      </div>
    </div>
  );
};

export default LatestJobPosting;

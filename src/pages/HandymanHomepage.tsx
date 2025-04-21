import React, { useEffect } from "react";
import { Bell, PenSquare } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useJobPostingStore from "../store/useJobPostingStore";
import SearchBar from "../ui/SearchBar";
import JobPostingCard from "../components/DashboardComponents/JobPostingClient";

const HandymanHomepage: React.FC = () => {
  const { user } = useAuthStore();
  const { fetchPosts, isLoading, error, getFilteredPosts } =
    useJobPostingStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = getFilteredPosts();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="width-90 py-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-500">
              Hello {user?.name?.split(" ")[0] || "Handyman"},
            </h1>
            <p className="text-gray-600">
              Looking for work? Find suitable handyman jobs in your area below.
            </p>
          </div>
          <button className="text-blue-500">
            <Bell size={24} />
          </button>
        </div>

        <SearchBar />

        <div className="mb-4 flex justify-end">
          <button className="flex items-center text-sm text-gray-600">
            <PenSquare size={16} className="mr-1" />
            Create New Post
          </button>
        </div>

        <div className="mb-4">
          <h2 className="mb-4 text-lg font-semibold">Recommended Jobs</h2>

          {isLoading && <p className="text-center py-4">Loading jobs...</p>}

          {error && (
            <div className="text-red-500 text-center py-4">
              Error loading jobs: {error}
            </div>
          )}

          {!isLoading && !error && filteredPosts.length === 0 && (
            <p className="text-center py-4 text-gray-500">
              No job postings found. Try adjusting your search.
            </p>
          )}

          {filteredPosts.map((posting) => (
            <div
              style={{ marginBottom: "55px" }}
              className="mb-4"
              key={posting.id}
            >
              <JobPostingCard posting={posting} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandymanHomepage;

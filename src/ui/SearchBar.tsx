import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import useJobPostingStore from "../store/useJobPostingStore";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useJobPostingStore();

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-4">
      <Search size={20} className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent border-none outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="p-1">
        <SlidersHorizontal size={20} className="text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBar;

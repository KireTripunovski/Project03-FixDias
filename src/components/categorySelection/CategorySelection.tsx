import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCategoriesStore from "../../store/useCateorySelection";
import { ChevronLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  imageUrl: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const CategorySelection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { setSelectedMainCategory } = useCategoriesStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/serviceCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = () => {
    if (!selectedCategoryId) {
      setError("Please select a category");
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.id === selectedCategoryId
    );
    if (selectedCategory) {
      setSelectedMainCategory(selectedCategory);
      navigate("/subcategory-selection");
    }
  };

  if (loading)
    return <div className="custom-container">Loading categories...</div>;
  if (error)
    return <div className="custom-container custom-error-message">{error}</div>;

  return (
    <div style={{ alignContent: "center", height: "100vh" }}>
      <div className="custom-container">
        <div className="custom-card">
          <div className="custom-card-body">
            <h1 style={{ textAlign: "left" }} className="custom-title pb-5 ">
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </h1>
            <h1
              style={{ textAlign: "left", fontSize: "35px" }}
              className="custom-title pb-5"
            >
              What’s your industry?{" "}
            </h1>
            <h2 style={{ textAlign: "left" }} className="custom-title pb-15">
              Select a Service Category
            </h2>

            {error && <div className="custom-error-message mt-4">{error}</div>}

            <div className="grid grid-cols-3 gap-3 mt-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  style={{ textAlign: "center", justifyItems: "center" }}
                  className={`custom-category-card border-2 rounded-lg p-2 cursor-pointer transition-all ${
                    selectedCategoryId === category.id
                      ? "custom-selected border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <img src={category.imageUrl} alt="" />
                  <h2 className="text-sm md:text-base font-semibold text-center break-words overflow-hidden text-ellipsis">
                    {category.name}
                  </h2>
                </div>
              ))}
            </div>

            <div className="flex justify-center py-8">
              <button
                style={{ width: "100%" }}
                onClick={handleSubmit}
                className="custom-btn custom-btn-primary"
              >
                Continue to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;

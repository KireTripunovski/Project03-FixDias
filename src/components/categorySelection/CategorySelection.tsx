import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCategoriesStore from "../../store/CateorySelection";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
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
    <div className="custom-container">
      <div className="custom-card">
        <div className="custom-card-body">
          <h1 className="custom-title">Select a Service Category</h1>

          {error && <div className="custom-error-message mt-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`custom-category-card ${
                  selectedCategoryId === category.id ? "custom-selected" : ""
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <input
                  type="radio"
                  name="categorySelection"
                  id={`category-${category.id}`}
                  checked={selectedCategoryId === category.id}
                  onChange={() => setSelectedCategoryId(category.id)}
                  className="custom-radio"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="w-full h-full cursor-pointer"
                >
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <p className="text-sm text-gray-600">
                    {category.subcategories.length} services available
                  </p>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="custom-btn custom-btn-primary"
            >
              Continue to Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;

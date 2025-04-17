import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCategoriesStore from "../../store/CateorySelection";
import useAuthStore from "../../store/authStore";
import styles from "./subcategory.module.css";

const SubcategorySelection = () => {
  const navigate = useNavigate();
  const {
    selectedMainCategory,
    selectedSubcategories,
    addSelectedSubcategory,
    removeSelectedSubcategory,
  } = useCategoriesStore();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedSubcategories, setCheckedSubcategories] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (!selectedMainCategory) {
      navigate("/category-selection");
    }
    setCheckedSubcategories(selectedSubcategories.map((sub) => sub.id));
  }, [selectedMainCategory, navigate, selectedSubcategories]);

  const handleCheckboxChange = (subcategoryId: string) => {
    setCheckedSubcategories((prev) => {
      if (prev.includes(subcategoryId)) {
        return prev.filter((id) => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
  };

  const handleSubmit = async () => {
    if (checkedSubcategories.length === 0) {
      setError("Please select at least one service");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedSubs = selectedMainCategory!.subcategories.filter((sub) =>
        checkedSubcategories.includes(sub.id)
      );

      selectedSubs.forEach((sub) => {
        if (!selectedSubcategories.some((s) => s.id === sub.id)) {
          addSelectedSubcategory(sub);
        }
      });

      selectedSubcategories.forEach((sub) => {
        if (!checkedSubcategories.includes(sub.id)) {
          removeSelectedSubcategory(sub.id);
        }
      });

      if (user) {
        const userPreference = {
          userId: user.id,
          selectedCategories: [
            {
              categoryId: selectedMainCategory!.id,
              categoryName: selectedMainCategory!.name,
              subcategories: selectedSubs.map((sub) => ({
                id: sub.id,
                name: sub.name,
              })),
            },
          ],
        };

        const checkResponse = await fetch(
          `http://localhost:5001/userPreferences?userId=${user.id}`
        );
        const existingPrefs = await checkResponse.json();
        let response;

        if (existingPrefs.length > 0) {
          response = await fetch(
            `http://localhost:5001/userPreferences/${existingPrefs[0].id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userPreference),
            }
          );
        } else {
          response = await fetch("http://localhost:5001/userPreferences", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userPreference),
          });
        }

        if (!response.ok) {
          throw new Error("Failed to save preferences");
        }
      }

      if (user) {
        navigate("/setup-complete");
      } else {
        localStorage.setItem(
          "pendingSubcategories",
          JSON.stringify({
            categoryId: selectedMainCategory!.id,
            categoryName: selectedMainCategory!.name,
            subcategories: selectedSubs.map((sub) => ({
              id: sub.id,
              name: sub.name,
            })),
          })
        );
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedMainCategory) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h1 className={styles.title}>Select Services</h1>
          <h2 className="text-lg mb-4">
            Category: {selectedMainCategory.name}
          </h2>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.subcategoryGrid}>
            {selectedMainCategory.subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className={`${styles.subcategoryCard} ${
                  checkedSubcategories.includes(subcategory.id)
                    ? styles.selected
                    : ""
                }`}
              >
                <div className={styles.subcategoryContent}>
                  <input
                    type="checkbox"
                    id={`subcategory-${subcategory.id}`}
                    checked={checkedSubcategories.includes(subcategory.id)}
                    onChange={() => handleCheckboxChange(subcategory.id)}
                    className={styles.checkbox}
                  />
                  <label
                    htmlFor={`subcategory-${subcategory.id}`}
                    className="cursor-pointer"
                  >
                    <h3 className="font-semibold">{subcategory.name}</h3>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => navigate("/category-selection")}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategorySelection;

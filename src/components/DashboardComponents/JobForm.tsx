import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./JobForm.module.css";
import useListingsStore from "../../store/useListingStore";

interface JobFormProps {
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  description: string;
  location: {
    latitude: number | null;
    longitude: number | null;
    state: string;
  };
}

interface State {
  id: number;
  name: string;
  country_name: string;
  latitude: string;
  longitude: string;
}

const JobForm: React.FC<JobFormProps> = ({ onSuccess }) => {
  const { createListing, isLoading } = useListingsStore();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: {
      latitude: null,
      longitude: null,
      state: "",
    },
  });
  const [states] = useState<State[]>([
    {
      id: 1,
      name: "Baden-Württemberg",
      country_name: "Germany",
      latitude: "48.66160370",
      longitude: "9.35013360",
    },
    {
      id: 2,
      name: "Bavaria",
      country_name: "Germany",
      latitude: "48.79044720",
      longitude: "11.49788950",
    },
    {
      id: 3,
      name: "Berlin",
      country_name: "Germany",
      latitude: "52.52000660",
      longitude: "13.40495400",
    },
    {
      id: 4,
      name: "Brandenburg",
      country_name: "Germany",
      latitude: "52.41252870",
      longitude: "12.53164440",
    },
    {
      id: 5,
      name: "Bremen",
      country_name: "Germany",
      latitude: "53.07929620",
      longitude: "8.80169360",
    },
    {
      id: 6,
      name: "Hamburg",
      country_name: "Germany",
      latitude: "53.55108460",
      longitude: "9.99368190",
    },
    {
      id: 7,
      name: "Hesse",
      country_name: "Germany",
      latitude: "50.65205150",
      longitude: "9.16243760",
    },
    {
      id: 8,
      name: "Lower Saxony",
      country_name: "Germany",
      latitude: "52.63670360",
      longitude: "9.84507660",
    },
    {
      id: 9,
      name: "Mecklenburg-Vorpommern",
      country_name: "Germany",
      latitude: "53.61265050",
      longitude: "12.42959530",
    },
    {
      id: 10,
      name: "North Rhine-Westphalia",
      country_name: "Germany",
      latitude: "51.43323670",
      longitude: "7.66159380",
    },
    {
      id: 11,
      name: "Rhineland-Palatinate",
      country_name: "Germany",
      latitude: "50.11834600",
      longitude: "7.30895270",
    },
    {
      id: 12,
      name: "Saarland",
      country_name: "Germany",
      latitude: "49.39642340",
      longitude: "7.02296070",
    },
    {
      id: 13,
      name: "Saxony",
      country_name: "Germany",
      latitude: "51.10454070",
      longitude: "13.20173840",
    },
    {
      id: 14,
      name: "Saxony-Anhalt",
      country_name: "Germany",
      latitude: "51.95026490",
      longitude: "11.69227340",
    },
    {
      id: 15,
      name: "Schleswig-Holstein",
      country_name: "Germany",
      latitude: "54.21936720",
      longitude: "9.69611670",
    },
    {
      id: 16,
      name: "Thuringia",
      country_name: "Germany",
      latitude: "51.01098920",
      longitude: "10.84534600",
    },
  ]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowStateDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  // select state
  const handleStateSelect = (state: State) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        state: state.name,
        latitude: parseFloat(state.latitude),
        longitude: parseFloat(state.longitude),
      },
    }));
    setShowStateDropdown(false);
  };

  //   input  change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   create post
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    if (!formData.location.state) {
      alert("Please select a state");
      return;
    }

    const success = await createListing({
      title: formData.title,
      description: formData.description,
      location: {
        latitude: formData.location.latitude as number,
        longitude: formData.location.longitude as number,
        state: formData.location.state,
      },
    });

    if (success) {
      setFormData({
        title: "",
        description: "",
        location: {
          latitude: null,
          longitude: null,
          state: "",
        },
      });

      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.mainHeaderSection}>
            <h1 className={styles.mainHeading}>Make a job</h1>
          </div>

          <p className={styles.explanatoryText}>
            Fill out all the necessary fields to write out a job
          </p>

          <form onSubmit={handleCreatePost}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>
                What service do you need?*
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title of the job"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Description:</label>
              <textarea
                name="description"
                placeholder="Im ready to work on..."
                value={formData.description}
                onChange={handleInputChange}
                className={styles.formTextarea}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Select State:*</label>
              <div
                className={styles.stateSelector}
                onClick={() => setShowStateDropdown(!showStateDropdown)}
                ref={dropdownRef}
              >
                <span>{formData.location.state || "Select state"}</span>
                <ChevronDown size={16} />

                {showStateDropdown && (
                  <div className={styles.stateDropdown}>
                    {states.map((state) => (
                      <div
                        key={state.id}
                        className={styles.stateOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStateSelect(state);
                        }}
                      >
                        {state.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="terms"
                className={styles.checkbox}
                required
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                Lorem ipsum dolor...
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              Make a job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;

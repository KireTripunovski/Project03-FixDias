import { useEffect, useState } from "react";
import styles from "./Section3.module.css";
import { ServiceCategory } from "../../types/types";
import CarouselDots from "../../ui/CarouselDots";

export default function Section3() {
  const [allServices, setAllServices] = useState<ServiceCategory[]>([]);
  const [currentServices, setCurrentServices] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5001/serviceCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();

        setAllServices(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (allServices.length > 0) {
      const startIndex = currentPage * 9;
      const endIndex = startIndex + 9;

      const pageServices = allServices.slice(startIndex, endIndex);

      const filledServices =
        pageServices.length < 9
          ? [...pageServices, ...allServices.slice(0, 9 - pageServices.length)]
          : pageServices;

      setCurrentServices(filledServices);
    }
  }, [allServices, currentPage]);

  if (loading) {
    return <div className={styles.loading}>Loading services...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>What you can offer</h1>

      <div className={styles.grid}>
        {currentServices.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.iconContainer}>
              <img
                src={service.imageUrl}
                alt={service.name}
                className={styles.serviceImage}
              />
            </div>
            <p className={styles.serviceName}>{service.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.carouselControls}>
        <div style={{ textAlign: "center" }}>
          <CarouselDots
            totalPages={Math.ceil(allServices.length / 9)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={styles.carouselDots}>
          {Array.from({ length: Math.ceil(allServices.length / 9) }).map(
            (_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentPage ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

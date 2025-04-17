import { Link } from "react-router";
import styles from "./Section1.module.css";

export default function Section1() {
  return (
    <div className="text-center">
      <h1 className={styles.fontsize40}>
        More orders. <br />
        More sales
      </h1>
      <div>
        <p className={styles.fontsize18}>
          Show your skills and win new customers.
        </p>
      </div>

      <div className={styles.imagesContainer}>
        {/* Left image */}
        <div style={{ marginLeft: "200px" }} className={styles.leftImageCol}>
          <div className={styles.imageCard}>
            <img
              src="../../../public/HomepageSection1/Rectangle 3463268.png"
              alt="Service provider"
              className={styles.serviceImage}
            />
            <span className={styles.availabilityTag}>Now available</span>
          </div>
        </div>

        {/* Right images column */}
        <div style={{ marginLeft: "35px" }} className={styles.rightImagesCol}>
          <div className={styles.imageCard}>
            <img
              src="../../../public/HomepageSection1/Rectangle 3463267.png"
              alt="Worker doing repairs"
              className={styles.serviceImage}
            />
            <span className={styles.repairTag}>repair</span>
          </div>

          <div style={{ marginLeft: "150px" }} className={styles.imageCard}>
            <img
              src="../../../public/HomepageSection1/Rectangle 3463269.png"
              alt="Professional service"
              className={styles.serviceImage}
            />
            <span className={styles.ratingTag}>4 (dot) 8</span>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.findJobsBtn}>Find jobs</button>
        <Link to={"/signup"}>
          <button className={styles.registerBtn}>Register now</button>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}

import styles from "./onboarding.module.css";
import setupcomplete from "../../../public/SetupComplete/tick-circle.png";
import { useNavigate } from "react-router";
function SetupComplete() {
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-center items-center min-h-screen ${styles.container}`}
    >
      <div className="w-[375px] h-[812px] relative flex flex-col items-center justify-center">
        <div
          className={`w-[119px] h-[123px] rounded-full flex items-center justify-center ${styles.outerCircle}`}
        >
          <div
            className={`w-[99px] h-[102px] rounded-full flex items-center justify-center ${styles.middleCircle}`}
          >
            <div
              className={`w-[79px] h-[82px] rounded-full flex items-center justify-center ${styles.innerCircle}`}
            >
              <img
                src={setupcomplete}
                alt="Setup Complete"
                className={`w-[40px] h-[40px] ${styles.innerCircle}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">You are all set!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Your profile is ready. Time to get started!
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className={`w-[327px] h-12 absolute bottom-[117px] rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity ${styles.button}`}
        >
          Go to Dashboard
        </button>

        <div
          className={`fixed w-[134px] h-[5px] bottom-2 rounded-full ${styles.indicator}`}
        />
      </div>
    </div>
  );
}

export default SetupComplete;

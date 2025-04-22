import { useNavigate } from "react-router";
import vector from "../../../public/HomepageSection1/Vector.png";
import useAuthStore from "../../store/useAuthStore";
export default function CustomersSection() {
  const profileImages = [
    "../../../public/HomepageSection1/avatar11.png",
    "../../../public/HomepageSection1/avatar12.png",
    "../../../public/HomepageSection1/avatar13.png",
    "../../../public/HomepageSection1/avatar14.png",
  ];
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };
  return (
    <section className=" my-15 ">
      <div className="max-w-md mx-auto">
        <h2 className="h1-headline font-bold text-center mb-2">
          More customers.
          <br />
          More orders.
          <br />
          <span className="relative">
            More sales
            <span className="absolute bottom-1 right-0  h-2 -z-10">
              <img src={vector} alt="" />
            </span>
          </span>
        </h2>

        <div className="flex justify-center mt-8 mb-2 relative">
          {profileImages.map((src, index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white ${
                index > 0 ? "-ml-2" : ""
              } relative z-${10 - index}`}
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Profile ${index + 1}`}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
          ))}
          <div className="flex items-center ml-2">
            <span className="text-sm font-medium">+2K</span>
          </div>
        </div>

        <p className="text-center text-gray-700 mt-4 mb-6">
          Use the opportunity to make your services known, to receive more
          orders and to work flexibly. Register now and start directly!
        </p>

        <button
          onClick={handleNavigation}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
        >
          Register now
        </button>
      </div>
    </section>
  );
}

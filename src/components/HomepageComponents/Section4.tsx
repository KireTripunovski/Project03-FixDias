import { useEffect, useState } from "react";
import CarouselSlider from "../DashboardComponents/Carousel";
import { HandymanProfile } from "../../store/useProfileStore";
import craftsmanimage from "../../../public/HomepageSection1/craftsman.png";

interface CraftsmanWithDetails extends HandymanProfile {
  userName: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}
export default function CraftsmanCarousel() {
  const [craftsmen, setCraftsmen] = useState<CraftsmanWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCraftsmen = async () => {
      try {
        setIsLoading(true);

        // Fetch all data
        const profilesResponse = await fetch(
          "http://localhost:5001/handymanProfiles"
        );
        const usersResponse = await fetch("http://localhost:5001/users");
        const preferencesResponse = await fetch(
          "http://localhost:5001/userPreferences"
        );

        if (
          !profilesResponse.ok ||
          !usersResponse.ok ||
          !preferencesResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const profiles = await profilesResponse.json();
        const users = await usersResponse.json();
        const preferences = await preferencesResponse.json();

        // Combine profiles with user data and preferences
        const profilesWithDetails = profiles.map((profile: HandymanProfile) => {
          const user = users.find(
            (u: { id: string }) => u.id === profile.userId
          );
          const userPreferences = preferences.find(
            (pref: { userId: string }) => pref.userId === profile.userId
          );

          return {
            ...profile,
            userName: user ? user.name : "Unknown",
            subcategories:
              userPreferences?.selectedCategories.flatMap(
                (category: { subcategories: any[] }) => category.subcategories
              ) || [],
          };
        });

        setCraftsmen(profilesWithDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCraftsmen();
  }, []);

  if (isLoading) {
    return <div>Loading craftsmen...</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Available Craftsmen</h2>
      <CarouselSlider autoPlay={false} showDots peekAmount={20}>
        {craftsmen.map((craftsman) => (
          <div key={craftsman.id} className="px-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Income  */}
              <div className="bg-blue-500 text-white text-center py-1 font-medium">
                € {craftsman.income || 1000} Additional Income
              </div>

              <div className="relative">
                {/*  Image */}
                <img
                  src={craftsmanimage}
                  alt={`${craftsman.userName}`}
                  className="w-full h-40 object-cover"
                />

                {/* Content  */}
                <div className="p-3">
                  <h3 className="font-bold text-lg">
                    {craftsman.userName || "Handyman"}
                  </h3>
                  {craftsman.profession && (
                    <p className="text-sm text-gray-600">
                      {craftsman.profession}
                    </p>
                  )}
                  {/*  Subcategories */}
                  <div className="mt-2">
                    {craftsman.subcategories &&
                    craftsman.subcategories.length > 0 ? (
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Services:
                        </p>
                        <ul className="text-sm text-gray-700">
                          {craftsman.subcategories.map((subcategory) => (
                            <li
                              key={subcategory.id}
                              className="flex items-start"
                            >
                              <span className="mr-1">•</span>
                              <span>{subcategory.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No services specified
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-gray-700">
                      {craftsman.location?.city || "Unknown City"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CarouselSlider>
    </div>
  );
}

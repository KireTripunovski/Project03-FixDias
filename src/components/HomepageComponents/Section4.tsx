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
      <CarouselSlider autoPlay={false} showDots peekAmount={20}>
        {craftsmen.map((craftsman) => (
          <div key={craftsman.id} className="px-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] flex flex-col">
              <div className="bg-blue-500 text-white text-center py-2 font-medium">
                € {craftsman.income || 1000} Additional Income
              </div>

              <div className="relative h-40 flex-shrink-0">
                <img
                  src={craftsmanimage}
                  alt={`${craftsman.userName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 flex flex-col flex-grow bg-gray-100">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {craftsman.userName || "Handyman"}
                </h3>

                <div className="mb-2 flex-grow overflow-hidden break-words">
                  {craftsman.subcategories &&
                  craftsman.subcategories.length > 0 ? (
                    <ul className="flex flex-wrap text-sm text-gray-700">
                      {craftsman.subcategories.map((subcategory) => (
                        <li
                          className="mr-2 mb-1 text-xs whitespace-normal"
                          key={subcategory.id}
                          style={{
                            color: "rgba(85, 132, 229, 1)",
                            backgroundColor: "rgba(232, 239, 254, 1)",
                            padding: "5px",
                            borderRadius: "5px",
                            fontSize: "12px",
                            margin: "10px 5px 0px 0",
                            display: "inline-block",
                          }}
                        >
                          {subcategory.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No services specified
                    </p>
                  )}
                </div>

                <div className="flex items-center border p-1 rounded-sm ml-1 text-gray-700 w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {craftsman.location?.city || "Unknown City"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CarouselSlider>
    </div>
  );
}

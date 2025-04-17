import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Service, ServiceCategory, User } from "../../types/types";

interface Craftsman extends Omit<User, "password"> {
  services?: Array<Pick<Service, "category">>;
  location?: {
    city: string;
    state: string;
    address?: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

const Section4 = () => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [serviceCategories, setServiceCategories] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch handymen
        const craftsmenResponse = await fetch(
          "http://localhost:5001/users?userType=handyman"
        );
        const craftsmenData: User[] = await craftsmenResponse.json();

        // Fetch their services to get location and categories
        const craftsmenWithDetails = await Promise.all(
          craftsmenData.map(async (craftsman) => {
            const servicesResponse = await fetch(
              `http://localhost:5001/services?providerId=${craftsman.id}`
            );
            const services: Service[] = await servicesResponse.json();

            // Get the first service with location (if exists)
            const serviceWithLocation = services.find((s) => s.location);

            return {
              ...craftsman,
              location: serviceWithLocation?.location || undefined,
              services: services.map((s) => ({ category: s.category })),
            };
          })
        );

        // Fetch service categories for display
        const categoriesResponse = await fetch(
          "http://localhost:5001/serviceCategories"
        );
        const categoriesData: ServiceCategory[] =
          await categoriesResponse.json();

        const categoriesMap = categoriesData.reduce(
          (acc: Record<string, string>, cat) => {
            acc[cat.id] = cat.name;
            return acc;
          },
          {}
        );

        setCraftsmen(craftsmenWithDetails);
        setServiceCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTopCategories = (services: Array<{ category: string }>) => {
    if (!services || services.length === 0) return "Various services";

    // Get unique category names
    const uniqueCategories = [
      ...new Set(
        services.map((s) => serviceCategories[s.category] || "Various")
      ),
    ].slice(0, 3);

    return uniqueCategories.join(", ");
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Craftsmen grow faster with our app!
      </h2>

      <div className="flex justify-around space-x-4">
        {craftsmen.slice(0, 2).map((craftsman) => (
          <div key={craftsman.id} className="text-center">
            <div
              style={{ backgroundColor: "#1461F0", margin: "15px 0" }}
              className="bg-blue-500 text-white text-center py-2 rounded mb-4"
            >
              € 1000 Additional Income
            </div>
            <div className="w-24 h-24 mx-auto mb-2 bg-gray-200 rounded-full overflow-hidden">
              <img
                src="/api/placeholder/96/96"
                alt={craftsman.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">{craftsman.name}</h3>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <MapPin size={16} className="mr-1" />
              {craftsman.location
                ? `${craftsman.location.city}, ${craftsman.location.state}`
                : "Location not specified"}
            </div>
            <div className="text-xs text-gray-500">
              {getTopCategories(craftsman.services || [])}
            </div>
          </div>
        ))}
      </div>

      <button
        style={{ backgroundColor: "#E5733F", marginTop: "15px" }}
        className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600 transition"
      >
        Register now
      </button>
    </div>
  );
};

export default Section4;

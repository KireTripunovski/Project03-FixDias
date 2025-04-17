// import { useEffect, useState } from "react";
// import { Service, ServiceRequest, User } from "../types/types";

// export interface Data {
//   users: User[];
//   services: Service[];
//   serviceRequests: ServiceRequest[];
// }

// // ServiceRequestCards Component
// const ServiceRequestCards: React.FC = () => {
//   const [data, setData] = useState<Data>({
//     users: [],
//     services: [],
//     serviceRequests: [],
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5001");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const jsonData: Data = await response.json();
//         setData(jsonData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Helper function to calculate time difference
//   const getTimeAgo = (dateString: string): string => {
//     const now = new Date();
//     const past = new Date(dateString);
//     const diffInMilliseconds = now.getTime() - past.getTime();

//     // Convert to days
//     const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
//     if (days < 1) {
//       const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
//       return `${hours} hours ago`;
//     }
//     return `${days} days ago`;
//   };

//   // Helper function to find a user by ID
//   const findUser = (userId: string): User | undefined => {
//     return data.users.find((user) => user.id === userId);
//   };

//   // Helper function to find a service by ID
//   const findService = (serviceId: string): Service | undefined => {
//     return data.services.find((service) => service.id === serviceId);
//   };

//   // Loading state
//   if (loading) {
//     return <div className="p-4 text-center">Loading service requests...</div>;
//   }

//   // Error state
//   if (error) {
//     return <div className="p-4 text-center text-red-500">Error: {error}</div>;
//   }

//   // No service requests found
//   if (data.serviceRequests.length === 0) {
//     return <div className="p-4 text-center">No service requests found</div>;
//   }

//   return (
//     <div className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
//       {data.serviceRequests.map((request) => {
//         const customer = findUser(request.customerId) || {
//           name: "Unknown User",
//         };
//         const service = findService(request.serviceId) || {
//           title: "Unknown Service",
//           description: "",
//           location: { city: "", state: "" },
//         };

//         // Use the service description if available, otherwise use the request notes
//         const description = request.notes || service.description;

//         // Determine if the request is urgent based on status
//         const isUrgent =
//           request.status === "pending" || request.status === "urgent";

//         return (
//           <div
//             key={request.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
//           >
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center">
//                   {/* User avatar placeholder */}
//                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                     <span className="text-gray-600 font-medium">
//                       {customer.name.charAt(0)}
//                     </span>
//                   </div>

//                   <div>
//                     <p className="font-medium text-gray-800">{customer.name}</p>
//                     <p className="text-xs text-gray-500">Trustworthy</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   {isUrgent && (
//                     <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded mr-2">
//                       URGENT
//                     </span>
//                   )}
//                   <button className="text-blue-500">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <h3 className="font-medium text-gray-900">
//                   {service.title || "Repair a leaky tube"}
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   {getTimeAgo(request.createdAt as string)}
//                 </p>
//               </div>

//               <p className="text-sm text-gray-700 mb-3">{description}</p>

//               <div className="flex items-center text-sm text-gray-600 mb-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 <span>
//                   {service.location?.city || "Berlin"},{" "}
//                   {service.location?.state || "Germany"}
//                 </span>
//               </div>

//               <div className="text-sm text-gray-500 mb-3">
//                 address
//                 <button className="ml-4 text-blue-500 text-xs">
//                   Show on the map
//                 </button>
//               </div>

//               <div className="flex justify-end">
//                 <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
//                   Contact
//                 </button>
//               </div>
//             </div>
//             <button className="w-full flex justify-center py-2 border-t border-gray-200 text-gray-500">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ServiceRequestCards;

import { Home, MessageSquare, Search, Ticket, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Bookings", path: "/booking", icon: Ticket },
    { name: "Search", path: "/map", icon: Search, hasNotification: true },
    { name: "Home", path: "/handymanhomepage", icon: Home },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Profile", path: "/dashboard", icon: User },
  ];

  const activeTab = navItems.find(
    (item) =>
      currentPath === item.path ||
      (item.path !== "/" && currentPath.startsWith(item.path))
  )?.name;

  return (
    <div className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center px-4 py-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.hasNotification && (
                  <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gray-500"></div>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  !isActive && item.name !== activeTab ? "invisible" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center pb-1">
        <div className="h-1 w-32 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}

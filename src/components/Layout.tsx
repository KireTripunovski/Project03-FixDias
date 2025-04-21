import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isOnboardingPage =
    location.pathname === "/category-selection" ||
    location.pathname === "/subcategory-selection" ||
    location.pathname === "/setup-complete";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-20">
        <Outlet />
      </div>
      {!isHomePage && !isOnboardingPage && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <NavigationBar />
        </div>
      )}
    </div>
  );
}

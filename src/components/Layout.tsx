import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const isOnboardingPage =
    location.pathname === "/category-selection" ||
    location.pathname === "/subcategory-selection" ||
    location.pathname === "/setup-complete";

  return (
    <div className="flex flex-col min-h-screen pb-5">
      <div className="flex-grow ">
        <Outlet />
      </div>
      {!isHomePage && !isSignUpPage && !isLoginPage && !isOnboardingPage && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <NavigationBar />
        </div>
      )}
    </div>
  );
}

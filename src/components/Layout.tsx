import { Outlet, useLocation } from "react-router-dom";
import StatusBar from "./StatusBar";
import NavigationBar from "./NavigationBar";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isHomePage && <NavigationBar />}
    </div>
  );
}

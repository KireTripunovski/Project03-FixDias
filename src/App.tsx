// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import CategorySelection from "./components/categorySelection/CategorySelection";
import SubcategorySelection from "./components/categorySelection/SubCategory";
import SetupComplete from "./components/categorySelection/SetupComplete";
import EditAccountInfo from "./pages/EditAccountInfo";
import Dashboard from "./pages/Dashboard";
import BookingsSection from "./components/DashboardComponents/Booking";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the wrapper

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category-selection" element={<CategorySelection />} />
          <Route
            path="/subcategory-selection"
            element={<SubcategorySelection />}
          />
          <Route path="/setup-complete" element={<SetupComplete />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/editaccount"
            element={
              <ProtectedRoute>
                <EditAccountInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingsSection />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

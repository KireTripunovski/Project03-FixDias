"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { SignUpData } from "../types/types";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useAuthStore();
  const [userType, setUserType] = useState<"customer" | "handyman">("customer");
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataWithUserType = {
      ...formData,
      userType,
    };

    const success = await signUp(dataWithUserType);
    if (success) {
      navigate("/category-selection");
    }
  };

  return (
    <div className="custom-container">
      <div className="custom-card">
        <div className="custom-card-body">
          <h1 className="custom-title">
            Sign up as a {userType === "customer" ? "Customer" : "Handyman"}
          </h1>

          <div className="custom-tab-container">
            <div
              className={`custom-tab ${
                userType === "customer" ? "active" : ""
              }`}
              onClick={() => setUserType("customer")}
            >
              Register as Customer
            </div>
            <div
              className={`custom-tab ${
                userType === "handyman" ? "active" : ""
              }`}
              onClick={() => setUserType("handyman")}
            >
              Register as Handyman
            </div>
          </div>

          {error && <div className="custom-error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="custom-form-group">
                <div className="custom-input-group">
                  <span className="custom-input-icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="custom-form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="custom-form-group">
                <div className="custom-input-group">
                  <span className="custom-input-icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                    className="custom-form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="custom-form-group">
                <div className="custom-input-group">
                  <span className="custom-input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    className="custom-form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="custom-password-toggle"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="custom-form-group">
                <div className="custom-input-group">
                  <span className="custom-input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="custom-form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="custom-password-toggle"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="custom-form-group">
                <div className="custom-input-group">
                  <span className="custom-input-icon">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    className="custom-form-input"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="custom-btn custom-btn-primary custom-mt-6"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="custom-text-center custom-mt-6 text-sm text-gray">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

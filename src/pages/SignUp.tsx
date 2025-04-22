import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { SignUpData } from "../types/types";
import {
  Input,
  PasswordInput,
  AuthFormContainer,
  ErrorMessage,
  SubmitButton,
  AuthFooter,
  UserTypeTabs,
} from "../components/auth";

// test user user1@email.com password:123

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useAuthStore();
  const [userType, setUserType] = useState<"customer" | "handyman">("handyman");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthFormContainer
      title={`Sign up as a ${
        userType === "customer" ? "Customer" : "Handyman"
      }`}
    >
      <UserTypeTabs
        userType={userType}
        setUserType={setUserType}
        disabled={true}
      />
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          icon={<FaUser />}
        />
        <Input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={formData.email}
          onChange={handleChange}
          icon={<FaEnvelope />}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
        />
        <Input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          icon={<FaPhone />}
        />
        <SubmitButton
          isLoading={isLoading}
          buttonText="Register"
          loadingText="Registering..."
        />
      </form>
      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        to="/login"
      />
    </AuthFormContainer>
  );
};

export default SignUp;

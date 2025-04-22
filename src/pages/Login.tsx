import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { LoginCredentials } from "../types/types";
import {
  Input,
  PasswordInput,
  AuthFormContainer,
  ErrorMessage,
  SubmitButton,
  AuthFooter,
} from "../components/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthFormContainer title="Login to Your Account">
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={credentials.email}
          onChange={handleChange}
          icon={<FaEnvelope />}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <SubmitButton
          isLoading={isLoading}
          buttonText="Login"
          loadingText="Logging in..."
        />
      </form>
      <AuthFooter
        text="Don't have an account?"
        linkText="Register"
        to="/signup"
      />
    </AuthFormContainer>
  );
};

export default Login;

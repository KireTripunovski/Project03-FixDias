import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { LoginCredentials } from "../types/types";

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

  return (
    <div className="custom-container">
      <div className="custom-card">
        <div className="custom-card-body">
          <h1 className="custom-title">Login to Your Account</h1>

          {error && <div className="custom-error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    value={credentials.email}
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
                    value={credentials.password}
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="custom-btn custom-btn-primary custom-mt-6"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="custom-text-center custom-mt-6 text-sm text-gray">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

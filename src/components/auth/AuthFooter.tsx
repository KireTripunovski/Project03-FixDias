import React from "react";
import { Link } from "react-router-dom";

interface AuthFooterProps {
  text: string;
  linkText: string;
  to: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, to }) => (
  <div className="custom-text-center custom-mt-6 text-sm text-gray">
    {text}{" "}
    <Link to={to} className="link">
      {linkText}
    </Link>
  </div>
);

export default AuthFooter;

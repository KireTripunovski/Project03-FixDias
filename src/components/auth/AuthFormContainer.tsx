import React from "react";

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
}) => (
  <div className="custom-container">
    <div className="custom-card">
      <div className="custom-card-body">
        <h1 className="custom-title">{title}</h1>
        {children}
      </div>
    </div>
  </div>
);

export default AuthFormContainer;

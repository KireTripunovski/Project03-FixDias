import React from "react";
import "./UserType.css";
interface UserTypeTabsProps {
  userType: "customer" | "handyman";
  setUserType: React.Dispatch<React.SetStateAction<"customer" | "handyman">>;
  disabled?: boolean;
}

const UserTypeTabs: React.FC<UserTypeTabsProps> = ({
  userType,
  setUserType,
  disabled = false,
}) => (
  <div className="custom-tab-container">
    <div
      className={`custom-tab ${userType === "customer" ? "active" : ""} ${
        disabled ? "disabled-tab" : ""
      }`}
      onClick={disabled ? undefined : () => setUserType("customer")}
    >
      Register as Customer
    </div>
    <div
      className={`custom-tab ${userType === "handyman" ? "active" : ""}`}
      onClick={() => setUserType("handyman")}
    >
      Register as Handyman
    </div>
  </div>
);

export default UserTypeTabs;

import React from "react";
import { LogOut } from "lucide-react";

interface FooterActionsProps {
  onLogout: () => void;
  className?: string;
}

export const FooterActions: React.FC<FooterActionsProps> = ({
  onLogout,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        className="flex items-center text-red-600 font-medium"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log out
      </button>
    </div>
  );
};

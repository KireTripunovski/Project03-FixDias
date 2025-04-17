import React from "react";
import { LogOut } from "lucide-react";

interface FooterActionsProps {
  onLogout: () => void;
}

export const FooterActions: React.FC<FooterActionsProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
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

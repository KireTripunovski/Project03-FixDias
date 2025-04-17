import React from "react";

export const NotificationPreferences: React.FC = () => {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-start gap-3">
        <div className="h-5 w-5 rounded border border-[#ff6600] flex-shrink-0 mt-0.5"></div>
        <div>
          <p className="text-sm font-medium">Notify by email</p>
          <p className="text-xs text-gray-500">
            Be notified by email when something happens
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-5 w-5 rounded border border-[#ff6600] flex-shrink-0 mt-0.5"></div>
        <div>
          <p className="text-sm font-medium">Notify</p>
          <p className="text-xs text-gray-500">
            Be notified by SMS when something happens
          </p>
        </div>
      </div>
    </div>
  );
};

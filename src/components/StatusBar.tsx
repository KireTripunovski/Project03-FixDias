import { Battery, Signal, Wifi } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <div className="flex justify-between items-center px-5 py-2 w-full">
        <div className="font-semibold text-[#000000]">9:41</div>

        <div className="flex items-center gap-1">
          <div className="h-4 w-4 flex items-center">
            <Signal className="h-4 w-4 text-[#000000]" />
          </div>

          <div className="h-4 w-4 flex items-center">
            <Wifi className="h-4 w-4 text-[#000000]" />
          </div>

          <div className="h-4 w-6 flex items-center">
            <Battery className="h-4 w-6 text-[#000000]" />
          </div>
        </div>
      </div>
    </div>
  );
}

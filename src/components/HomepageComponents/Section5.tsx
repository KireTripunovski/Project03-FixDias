import { FileText, MessageCircle, Ticket } from "lucide-react";
import phone from "../../../public/HomepageSection1/phone.png";

const Section5 = () => {
  const steps = [
    {
      icon: FileText,
      title: "Create your profile",
      description:
        "Create your profile, set your availability and present your services.",
    },
    {
      icon: MessageCircle,
      title: "Find jobs & be booked",
      description:
        "Browse available orders near you and contact potential customers.",
    },
    {
      icon: Ticket,
      title: "Chat & Buchen",
      description:
        "Clarify details directly via our app and get secure bookings.",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md px-4 py-6 bg-white">
        <div className="mb-6 flex justify-center">
          <img
            src={phone}
            alt="Phone showcase"
            className="max-w-full h-auto object-contain"
          />
        </div>
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center mb-6 last:mb-0 bg-gray-50 rounded-lg p-4 shadow-sm"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mr-4 shrink-0">
              <step.icon className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5;

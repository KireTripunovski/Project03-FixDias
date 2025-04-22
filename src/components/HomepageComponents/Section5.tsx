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
    <div className="w-full my-15 flex justify-center">
      <div className="w-full ">
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
            className="flex items-center mb-6 last:mb-0 rounded-lg p-4 flex-col"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
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

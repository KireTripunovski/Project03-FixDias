import { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";

interface Testimonial {
  img: string;
  name: string;
  rating: number;
  comment: string;
  jobTitle: string;
  location: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5001/realExperiences");

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError("Failed to load testimonials. Please try again later.");
        console.error("Error fetching testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ));
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="bg-[#FFEFE6] py-5 my-15 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <div className="text-blue-500 text-6xl font-bold leading-none mb-2">
            "
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Real experiences, real success
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            Find out how craftsmen get more orders with our app, increase your
            income and expand your business.
          </p>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-lg shadow-sm p-6 overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={
                      testimonial.img.replace("../../../public", "") ||
                      "/placeholder.svg"
                    }
                    alt={`${testimonial.name} profile picture`}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-blue-500 text-sm">
                    {testimonial.jobTitle}, {testimonial.location}
                  </p>
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

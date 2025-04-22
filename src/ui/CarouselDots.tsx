interface CarouselDotsProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function CarouselDots({
  totalPages,
  currentPage,
  setCurrentPage,
}: CarouselDotsProps) {
  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index)}
          className={`w-4 h-4 rounded-full transition-colors duration-200 ${
            index === currentPage ? "bg-orange-500" : "bg-gray-300"
          }`}
          aria-label={`Go to page ${index + 1}`}
          aria-current={index === currentPage ? "true" : "false"}
        />
      ))}
    </div>
  );
}

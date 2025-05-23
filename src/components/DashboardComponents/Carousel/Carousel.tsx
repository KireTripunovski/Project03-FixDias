import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import "./Carousel.css";

interface CarouselSliderProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infiniteLoop?: boolean;
  peekAmount?: number;
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({
  children,
  autoPlay = true,
  interval = 3000,
  showArrows = false,
  showDots = false,
  infiniteLoop = true,
  peekAmount = 10,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (currentIndex < length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (infiniteLoop) {
      setCurrentIndex(0);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, infiniteLoop, isTransitioning, length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (infiniteLoop) {
      setCurrentIndex(length - 1);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, infiniteLoop, isTransitioning, length]);

  useEffect(() => {
    if (autoPlay && length > 1 && !isSwiping) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, interval, length, nextSlide, isSwiping]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsSwiping(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    if (touchStartX !== null && touchCurrentX !== null) {
      const difference = touchStartX - touchCurrentX;
      const swipeThreshold = 50;

      if (difference > swipeThreshold) {
        nextSlide();
      } else if (difference < -swipeThreshold) {
        prevSlide();
      }
    }

    setTouchStartX(null);
    setTouchCurrentX(null);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const slideWidth = 100 - peekAmount;

  return (
    <div className="carousel-container ">
      <h1
        style={{ fontWeight: "500", fontSize: "32px" }}
        className="py-5 text-center weight-400"
      >
        Craftsmen grow faster with our app!
      </h1>
      <div
        className="carousel-wrapper prevent-swipe-navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showArrows && length > 1 && (
          <button
            onClick={prevSlide}
            className="carousel-arrow left-arrow"
            aria-label="Previous slide"
          >
            &lt;
          </button>
        )}

        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${currentIndex * slideWidth}%)`,
              transition: isTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
          >
            {children.map((child, index) => (
              <div
                key={index}
                className="carousel-slide"
                style={{
                  width: `${slideWidth}%`,
                  marginRight: `35px`,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {showArrows && length > 1 && (
          <button
            onClick={nextSlide}
            className="carousel-arrow right-arrow"
            aria-label="Next slide"
          >
            &gt;
          </button>
        )}
      </div>

      {showDots && length > 1 && (
        <div className="carousel-dots">
          {Array.from({ length }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselSlider;

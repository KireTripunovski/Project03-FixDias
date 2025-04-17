import React, { useState, useEffect, useRef, ReactNode } from "react";
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
  infiniteLoop = true,
  peekAmount = 20,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  useEffect(() => {
    if (autoPlay && length > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [length, currentIndex, autoPlay, interval]);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (currentIndex < length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (infiniteLoop) {
      setCurrentIndex(0);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (infiniteLoop) {
      setCurrentIndex(length - 1);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (difference > 5) {
      nextSlide();
    } else if (difference < -5) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideWidth = 100 - peekAmount;

  return (
    <div className="carousel-container py-17 width-90">
      <h1 style={{ fontWeight: "700", fontSize: "24px" }} className="py-5">
        Current Work
      </h1>
      <div
        className="carousel-wrapper prevent-swipe-navigation"
        ref={sliderRef}
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
                  marginRight: `${peekAmount}%`,
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
    </div>
  );
};

export default CarouselSlider;

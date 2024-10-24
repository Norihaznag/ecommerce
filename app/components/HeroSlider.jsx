'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      className="relative h-[80vh] overflow-hidden"
      aria-live="polite"
    >
      <div 
        className="transition-transform duration-500 ease-in-out flex h-full"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0 px-[6%] "
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="max-w-7xl mx-auto lg:px-8 h-full">
              <div className=" flex gap-8 items-center  h-full">
                <div className="text-white">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl mb-8">
                    {slide.description}
                  </p>
                  <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300">
                    {slide.buttonText}
                  </button>
                </div>
                <div className="relative hidden lg:block">
                  <div className="relative h-[500px] w-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={() => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-black w-4' : 'bg-black/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

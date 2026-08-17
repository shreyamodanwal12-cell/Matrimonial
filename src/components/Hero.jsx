import { useEffect, useState } from "react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";

const slides = [
  {
    image: hero1,
    title: "Where Divine",
    highlight: "Matches Begin",
    subtitle:
      "Discover meaningful connections rooted in tradition, values and love.",
  },
  {
    image: hero2,
    title: "Find Your",
    highlight: "Perfect Partner",
    subtitle:
      "A beautiful beginning to a lifelong journey of love and togetherness.",
  },
  {
    image: hero3,
    title: "Two Hearts,",
    highlight: "One Beautiful Journey",
    subtitle:
      "Meet genuine people who are looking for a meaningful relationship.",
  },
  {
    image: hero4,
    title: "Begin Your",
    highlight: "Forever Story",
    subtitle:
      "Let your search for a life partner begin with trust and tradition.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-78px)] overflow-hidden bg-[#401711]"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`
            absolute inset-0
            bg-cover bg-center
            transition-opacity duration-[1500ms] ease-in-out
            ${
              index === currentSlide
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      ))}

      {/* Dark Red Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(55,10,8,0.88)_0%,rgba(91,18,13,0.68)_42%,rgba(62,13,10,0.32)_100%)]" />

      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,178,73,0.18),transparent_45%)]" />

      {/* Decorative Border */}
      <div className="absolute inset-5 rounded-[28px] border border-[#f2c15b]/20 sm:inset-8" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-78px)] items-center">
        <div className="mx-auto w-[92%] max-w-[1180px]">
          <div className="max-w-[650px] text-white">

            {/* Small Heading */}
            <div
              key={`small-${currentSlide}`}
              className="animate-[fadeIn_1s_ease-out]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#f2c15b]" />

                <p className="text-[10px] font-semibold uppercase tracking-[4px] text-[#f2c15b]">
                  Shiva Parvati Matrimonial
                </p>

                <span className="h-px w-10 bg-[#f2c15b]" />
              </div>
            </div>

            {/* Main Heading */}
            <div
              key={`heading-${currentSlide}`}
              className="animate-[heroText_1s_ease-out]"
            >
              <h1 className="font-serif text-[clamp(48px,7vw,82px)] font-semibold leading-[0.95] tracking-[-1px]">
                {slides[currentSlide].title}
                <span className="mt-2 block text-[#f2c15b]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="mt-7 max-w-[560px] text-[14px] leading-7 text-[#f8e8d5] sm:text-[15px]">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">

              <a
                href="/register"
                className="
                  rounded-md
                  bg-[#f2c15b]
                  px-6
                  py-3.5
                  text-[12px]
                  font-semibold
                  text-[#4a1b12]
                  shadow-[0_8px_25px_rgba(0,0,0,0.18)]
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#ffd477]
                "
              >
                Register Free Now
              </a>

              <a
                href="#profiles"
                className="
                  rounded-md
                  border
                  border-[#f2c15b]
                  bg-white/5
                  px-6
                  py-3.5
                  text-[12px]
                  font-semibold
                  text-[#f2c15b]
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#f2c15b]
                  hover:text-[#4a1b12]
                "
              >
                Browse Profiles
              </a>

            </div>

          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">

        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              h-1.5 rounded-full transition-all duration-500
              ${
                index === currentSlide
                  ? "w-8 bg-[#f2c15b]"
                  : "w-1.5 bg-white/60 hover:bg-white"
              }
            `}
          />
        ))}

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 text-[#f5d28a] sm:flex">

        <span className="text-[8px] uppercase tracking-[3px] [writing-mode:vertical-rl]">
          Scroll
        </span>

        <span className="h-10 w-px bg-[#f5d28a]/50" />

      </div>
    </section>
  );
}

export default Hero;
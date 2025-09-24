import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-microscopy.jpg"; // Placeholder for group photo

const PeopleHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax - Group Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <p className="text-statement text-white mb-8">
            Driven by curiosity, united by science.
          </p>

          <h1 className="text-hero text-white mb-12 flex flex-col items-center">
            <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase mb-4">our</span>
            <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase">team</span>
          </h1>

          <p className="text-display text-white max-w-4xl mx-auto mb-16 leading-relaxed">
            Meet the dedicated scientists and researchers who drive our mission to advance bacterial biology
            and antimicrobial discovery. Together, we combine diverse expertise, innovative thinking,
            and collaborative spirit to push the boundaries of scientific knowledge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#principal-investigator"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Meet the PI
            </a>
            <a
              href="#team-members"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              View All Members
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default PeopleHero;
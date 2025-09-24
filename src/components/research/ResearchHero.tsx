import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-microscopy.jpg";

const ResearchHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 hero-gradient opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <p className="text-statement text-white mb-8">
            Advancing the frontiers of bacterial biology.
          </p>

          <h1 className="text-hero text-white mb-12 flex flex-col items-center">
            <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase mb-4">research</span>
            <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-[0.3em] uppercase">&</span>
            <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase mt-4">discovery</span>
          </h1>

          <p className="text-display text-white max-w-4xl mx-auto mb-16 leading-relaxed">
            Our laboratory investigates the fundamental mechanisms of bacterial cell envelope biogenesis,
            combining cutting-edge biochemical techniques with innovative screening approaches to unlock
            new therapeutic targets and deepen our understanding of microbial life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#research-areas"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Explore Our Research
            </a>
            <a
              href="#publications"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Recent Publications
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

export default ResearchHero;
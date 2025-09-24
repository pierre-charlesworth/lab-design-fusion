import heroImage from "@/assets/e-coli-sem.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <p className="text-statement text-white mb-8">
            Science is a statement of discovery.
          </p>
          
          <h1 className="text-hero text-white mb-12 flex flex-col items-center">
            <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-[0.3em] uppercase mb-3">the</span>
            <span className="font-caslon font-normal italic text-white my-3">Polissi</span>
            <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-[0.3em] uppercase mt-3">laboratory</span>
          </h1>
          
          <p className="text-display text-white max-w-3xl mx-auto mb-16">
            Advanced research group crafting
            <br />
            <span className="font-medium">breakthrough discoveries and</span>
            <br />
            <span className="font-medium">innovative solutions for molecular science.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#research"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Explore Research
            </a>
            <a 
              href="#publications"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              View Publications
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

export default Hero;
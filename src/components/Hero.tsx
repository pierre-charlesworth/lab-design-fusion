import heroImage from "@/assets/hero-microscopy.jpg";

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
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <p className="text-display text-muted-foreground mb-6 tracking-wider uppercase">
            Pioneering molecular research
          </p>
          
          <h1 className="text-hero text-foreground mb-8 leading-tight">
            MOLECULAR
            <br />
            <span className="text-accent">RESEARCH</span>
            <br />
            LAB
          </h1>
          
          <p className="text-display text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Advancing scientific understanding through innovative research in protein structures, 
            membrane dynamics, and molecular mechanisms that drive biological processes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#research"
              className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg smooth-transition hover:shadow-accent-glow hover:scale-105"
            >
              Explore Research
            </a>
            <a 
              href="#publications"
              className="inline-flex items-center px-8 py-3 border border-accent text-accent font-semibold rounded-lg smooth-transition hover:bg-accent hover:text-accent-foreground"
            >
              View Publications
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-accent"
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
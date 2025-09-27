import { useState, useEffect } from "react";
import { client, queries, urlFor, type HeroSection } from "@/lib/sanity";
import heroImage from "@/assets/e-coli-sem.png";

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<HeroSection>(queries.heroSection, { page: 'main' });
        setHeroData(data);
      } catch (err) {
        console.error('Error fetching hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Fallback data
  const fallbackData: HeroSection = {
    _id: 'fallback',
    page: 'main',
    tagline: 'Science is a statement of discovery.',
    subtitle: 'Advanced research group crafting breakthrough discoveries and innovative solutions for molecular science.',
    primaryButton: { text: 'Explore Research', link: '#research' },
    secondaryButton: { text: 'View Publications', link: '#publications' },
    showScrollIndicator: true
  };

  const displayData = heroData || fallbackData;
  const backgroundImageUrl = displayData.backgroundImage ? urlFor(displayData.backgroundImage).width(1920).height(1080).url() : heroImage;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {displayData.tagline && (
            <p className="text-statement text-white mb-8">
              {displayData.tagline}
            </p>
          )}

          <h1 className="text-hero text-white mb-12 flex flex-col items-center">
            <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-[0.3em] uppercase mb-3">the</span>
            <span className="font-caslon font-normal italic text-white my-3">Polissi</span>
            <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-[0.3em] uppercase mt-3">laboratory</span>
          </h1>

          {displayData.subtitle && (
            <p className="text-display text-white max-w-3xl mx-auto mb-16">
              {displayData.subtitle.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < displayData.subtitle!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {displayData.primaryButton && (
              <a
                href={displayData.primaryButton.link}
                className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
              >
                {displayData.primaryButton.text}
              </a>
            )}
            {displayData.secondaryButton && (
              <a
                href={displayData.secondaryButton.link}
                className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
              >
                {displayData.secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {displayData.showScrollIndicator && (
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
      )}
    </section>
  );
};

export default Hero;
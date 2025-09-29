import { useEffect, useState } from "react";
import { client, queries, urlFor, type HeroSection } from "@/lib/sanity";

const PeopleHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<HeroSection>(queries.heroSection, { page: 'people' });
        setHeroData(data);
      } catch (err) {
        console.error('Error fetching people hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Fallback data
  const fallbackData: HeroSection = {
    _id: 'fallback',
    page: 'people',
    tagline: 'Driven by curiosity, united by science.',
    title: { line1: 'our', line2: 'team' },
    subtitle: 'Meet the dedicated scientists and researchers who drive our mission to advance bacterial biology and antimicrobial discovery. Together, we combine diverse expertise, innovative thinking, and collaborative spirit to push the boundaries of scientific knowledge.',
    primaryButton: { text: 'Meet the PI', link: '#principal-investigator' },
    secondaryButton: { text: 'View All Members', link: '#team-members' },
    showScrollIndicator: true
  };

  const displayData = heroData || fallbackData;
  const backgroundImageUrl = displayData.backgroundImage ? urlFor(displayData.backgroundImage).width(1920).height(1080).url() : null;
  const imageDarkness = displayData.imageDarkness ?? 60; // Default to 60% if not set

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax - Group Photo */}
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div
            className="absolute inset-0 hero-gradient"
            style={{ opacity: imageDarkness / 100 }}
          ></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {displayData.tagline && (
            <p className="text-statement text-white mb-8">
              {displayData.tagline}
            </p>
          )}

          <h1 className="text-hero text-white mb-12 flex flex-col items-center">
            {displayData.title?.line1 && (
              <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase mb-4">
                {displayData.title.line1}
              </span>
            )}
            {displayData.title?.line2 && (
              <span className="text-[clamp(2rem,5vw,3.5rem)] font-caslon font-normal italic">
                {displayData.title.line2}
              </span>
            )}
            {displayData.title?.line3 && (
              <span className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.2em] uppercase mt-4">
                {displayData.title.line3}
              </span>
            )}
          </h1>

          {displayData.subtitle && (
            <p className="text-display text-white max-w-4xl mx-auto mb-16 leading-relaxed">
              {displayData.subtitle}
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

export default PeopleHero;
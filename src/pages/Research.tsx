import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchAreaDetails from "@/components/research/ResearchAreaDetails";
import ResearchMetrics from "@/components/research/ResearchMetrics";
import Publications from "@/components/research/Publications";
import CollaborationCTA from "@/components/research/CollaborationCTA";

const Research = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling to hash target on page load
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ResearchHero />
        <ResearchAreaDetails />
        <ResearchMetrics />
        <Publications />
        <CollaborationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Research;
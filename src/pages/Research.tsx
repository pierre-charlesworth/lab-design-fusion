import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchAreaDetails from "@/components/research/ResearchAreaDetails";
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
      <SEO
        title="Research"
        description="Explore our research areas including LPS Biogenesis, Peptidoglycan Biosynthesis, and Antimicrobial Discovery."
      />
      <Navigation />
      <main>
        <ResearchHero />
        <ResearchAreaDetails />
        <Publications />
        <CollaborationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Research;
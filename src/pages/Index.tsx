import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
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
        title="Home"
        description="The Polissi Lab advances molecular science through innovative research and collaboration in bacterial cell envelope biogenesis and antimicrobial discovery."
      />
      <Navigation />
      <main>
        <Hero />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

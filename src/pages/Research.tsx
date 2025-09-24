import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchAreaDetails from "@/components/research/ResearchAreaDetails";
import ResearchMetrics from "@/components/research/ResearchMetrics";
import Publications from "@/components/research/Publications";
import CollaborationCTA from "@/components/research/CollaborationCTA";

const Research = () => {
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
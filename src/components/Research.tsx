import lpsImage from "@/assets/protein-structure.jpg";
import peptidoglycanImage from "@/assets/membrane-transport.jpg";
import screeningImage from "@/assets/outer-membrane.jpg";

const Research = () => {
  const researchAreas = [
    {
      title: "LPS Biogenesis",
      description: "Understanding the complex biosynthetic pathways and transport mechanisms involved in lipopolysaccharide assembly and delivery to the outer membrane of gram-negative bacteria.",
      image: lpsImage,
    },
    {
      title: "Peptidoglycan Biosynthesis and Remodeling",
      description: "Investigating the enzymatic machinery and regulatory networks controlling peptidoglycan synthesis, modification, and recycling during bacterial growth and division.",
      image: peptidoglycanImage,
    },
    {
      title: "Natural Product Screening",
      description: "Systematic discovery and characterization of bioactive natural compounds with antimicrobial properties, focusing on novel mechanisms of action against bacterial pathogens.",
      image: screeningImage,
    },
  ];

  return (
    <section id="research" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">selected works</p>
          <h2 className="text-section text-foreground mb-8">
            research <span className="text-muted-foreground">areas</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            We focus on bacterial cell envelope biogenesis and antimicrobial discovery, combining
            biochemical, genetic, and screening approaches to understand and target essential cellular processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <div 
              key={area.title}
              className="research-card bg-card border border-border rounded-lg overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.title}
                  className="w-full h-full object-cover smooth-transition hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-display text-muted-foreground mb-6">
            Interested in learning more about our detailed research programs?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/research"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Explore Research Details
            </a>
            <a
              href="#contact"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
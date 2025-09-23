import proteinImage from "@/assets/protein-structure.jpg";
import membraneImage from "@/assets/membrane-transport.jpg";
import outerMembraneImage from "@/assets/outer-membrane.jpg";

const Research = () => {
  const researchAreas = [
    {
      title: "Protein Structure Analysis",
      description: "Advanced computational and experimental approaches to understand protein folding, dynamics, and function at the molecular level.",
      image: proteinImage,
      technologies: ["X-ray Crystallography", "NMR Spectroscopy", "Cryo-EM", "Molecular Dynamics"],
    },
    {
      title: "Membrane Transport Mechanisms", 
      description: "Investigation of lipopolysaccharide transport systems and membrane protein assembly in bacterial cells.",
      image: membraneImage,
      technologies: ["Live Cell Imaging", "Patch Clamp", "Fluorescence Microscopy", "Biochemical Assays"],
    },
    {
      title: "Outer Membrane Assembly",
      description: "Elucidating the complex machinery responsible for outer membrane biogenesis in gram-negative bacteria.",
      image: outerMembraneImage,
      technologies: ["Electron Microscopy", "Cross-linking", "Proteomics", "Genetic Analysis"],
    },
  ];

  return (
    <section id="research" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-section text-foreground mb-6">
            Our <span className="text-accent">Research</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            We focus on fundamental questions in molecular biology, combining cutting-edge 
            experimental techniques with computational approaches to understand life at the molecular scale.
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
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {area.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent">Key Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-display text-muted-foreground mb-6">
            Interested in collaborating or learning more about our research?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg smooth-transition hover:shadow-accent-glow hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Research;
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import lpsImage from "@/assets/protein-structure.jpg";
import peptidoglycanImage from "@/assets/membrane-transport.jpg";
import screeningImage from "@/assets/outer-membrane.jpg";

const ResearchAreaDetails = () => {
  const researchAreas = [
    {
      id: "lps",
      title: "LPS Biogenesis",
      subtitle: "Lipopolysaccharide Assembly & Transport",
      image: lpsImage,
      overview: "Lipopolysaccharides (LPS) are complex glycolipids essential for the structural integrity and pathogenicity of Gram-negative bacteria. Our research focuses on understanding the intricate biosynthetic pathways that assemble these molecules and the sophisticated transport systems that deliver them to the bacterial outer membrane. We investigate the enzymatic cascades involved in LPS core oligosaccharide synthesis, O-antigen polymerization, and the critical Lpt transport machinery.",
      methods: [
        "Biochemical reconstitution of LPS transport complexes",
        "X-ray crystallography of transport proteins",
        "Live-cell fluorescence microscopy",
        "Mass spectrometry analysis of LPS structures",
        "Genetic complementation assays",
        "Crosslinking mass spectrometry (XL-MS)"
      ],
      projects: [
        {
          title: "LptDE Complex Structure-Function Analysis",
          status: "Active",
          description: "Investigating the molecular mechanism of LPS insertion into the outer membrane."
        },
        {
          title: "O-Antigen Length Regulation",
          status: "Active",
          description: "Understanding how bacteria control the length of their O-antigen chains."
        },
        {
          title: "LPS Transport in Pathogenic Bacteria",
          status: "Completed",
          description: "Comparative analysis of LPS transport systems across different bacterial species."
        }
      ],
      publications: [
        {
          title: "Structural insights into LPS transport across the bacterial periplasm",
          authors: "Smith J, Polissi A, et al.",
          journal: "Nature Structural & Molecular Biology",
          year: "2024"
        },
        {
          title: "The LptDE complex: gatekeeper of the outer membrane",
          authors: "Johnson M, Polissi A, Brown K",
          journal: "Cell",
          year: "2023"
        }
      ]
    },
    {
      id: "peptidoglycan",
      title: "Peptidoglycan Biosynthesis and Remodeling",
      subtitle: "Cell Wall Architecture & Dynamics",
      image: peptidoglycanImage,
      overview: "Peptidoglycan forms the essential structural framework of bacterial cell walls, providing shape and protection against osmotic stress. Our laboratory investigates the complex enzymatic machinery responsible for peptidoglycan synthesis, modification, and recycling during bacterial growth and division. We focus on understanding how bacteria coordinate cell wall biosynthesis with cell cycle progression and how they remodel their peptidoglycan architecture in response to environmental challenges.",
      methods: [
        "High-resolution cryo-electron microscopy",
        "Peptidoglycan biochemical assays",
        "Super-resolution fluorescence microscopy",
        "Chemical crosslinking studies",
        "Bacterial two-hybrid screening",
        "Metabolic labeling with fluorescent amino acids"
      ],
      projects: [
        {
          title: "PBP-Mediated Cell Wall Synthesis",
          status: "Active",
          description: "Characterizing penicillin-binding protein complexes and their regulation."
        },
        {
          title: "Peptidoglycan Recycling Pathways",
          status: "Active",
          description: "Investigating how bacteria recycle cell wall fragments during growth."
        },
        {
          title: "Cell Division and Wall Synthesis Coordination",
          status: "Planning",
          description: "Understanding the molecular mechanisms linking cell division to wall biosynthesis."
        }
      ],
      publications: [
        {
          title: "Coordinated peptidoglycan synthesis and cell division in E. coli",
          authors: "Davis L, Wilson R, Polissi A",
          journal: "Proceedings of the National Academy of Sciences",
          year: "2024"
        },
        {
          title: "Structural basis of peptidoglycan crosslinking",
          authors: "Martinez S, Polissi A, et al.",
          journal: "Science",
          year: "2023"
        }
      ]
    },
    {
      id: "screening",
      title: "Natural Product Screening",
      subtitle: "Antimicrobial Discovery & Characterization",
      image: screeningImage,
      overview: "With the growing threat of antibiotic resistance, there is an urgent need for new antimicrobial compounds. Our screening program focuses on the systematic discovery and characterization of bioactive natural products with novel mechanisms of action against bacterial pathogens. We employ high-throughput screening approaches combined with sophisticated analytical techniques to identify compounds that target essential cellular processes, particularly those involved in cell envelope biogenesis.",
      methods: [
        "High-throughput phenotypic screening",
        "Bioactivity-guided fractionation",
        "NMR structure elucidation",
        "Target identification through chemical genetics",
        "Minimum inhibitory concentration (MIC) assays",
        "Time-kill kinetic studies",
        "Resistance mechanism analysis"
      ],
      projects: [
        {
          title: "Marine Natural Products Library Screening",
          status: "Active",
          description: "Screening marine-derived compounds for novel antibacterial activities."
        },
        {
          title: "Cell Envelope-Targeting Compounds",
          status: "Active",
          description: "Identifying natural products that specifically target cell wall biosynthesis."
        },
        {
          title: "Mechanism of Action Studies",
          status: "Active",
          description: "Characterizing the molecular targets of promising antimicrobial leads."
        }
      ],
      publications: [
        {
          title: "Discovery of novel cell wall-targeting antibiotics from marine bacteria",
          authors: "Thompson K, Polissi A, et al.",
          journal: "Nature Chemistry",
          year: "2024"
        },
        {
          title: "High-throughput screening for LPS biosynthesis inhibitors",
          authors: "Garcia R, Liu X, Polissi A",
          journal: "ACS Chemical Biology",
          year: "2023"
        }
      ]
    }
  ];

  return (
    <section id="research-areas" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">in depth analysis</p>
          <h2 className="text-section text-foreground mb-8">
            research <span className="text-muted-foreground">areas</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Dive deeper into our three core research areas, exploring the methodologies,
            current projects, and discoveries that drive our scientific mission.
          </p>
        </div>

        <div className="space-y-24">
          {researchAreas.map((area, index) => (
            <div
              key={area.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Image Section */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-80 lg:h-96 object-cover smooth-transition hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{area.title}</h3>
                    <p className="text-white/90 text-sm font-light tracking-wide">{area.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="methods" className="text-xs">Methods</TabsTrigger>
                    <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                    <TabsTrigger value="publications" className="text-xs">Papers</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      {area.overview}
                    </p>
                  </TabsContent>

                  <TabsContent value="methods" className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {area.methods.map((method, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{method}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4">
                    <div className="space-y-4">
                      {area.projects.map((project, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{project.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              project.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                              project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="publications" className="space-y-4">
                    <div className="space-y-4">
                      {area.publications.map((pub, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4">
                          <h4 className="font-serif italic text-foreground mb-2">{pub.title}</h4>
                          <p className="text-muted-foreground text-sm mb-1">{pub.authors}</p>
                          <p className="text-accent text-sm font-medium">{pub.journal} ({pub.year})</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreaDetails;
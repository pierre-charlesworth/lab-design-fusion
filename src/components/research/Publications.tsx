import { useState } from "react";

const Publications = () => {
  const [selectedArea, setSelectedArea] = useState("all");

  const publications = [
    {
      id: 1,
      title: "Structural insights into LPS transport across the bacterial periplasm",
      authors: "Smith J, Johnson M, Polissi A, Brown K, Davis L",
      journal: "Nature Structural & Molecular Biology",
      year: 2024,
      area: "lps",
      abstract: "We present high-resolution structures of the LptDE complex in multiple conformational states, revealing the molecular mechanism by which lipopolysaccharides are transported across the bacterial periplasm and inserted into the outer membrane.",
      doi: "10.1038/s41594-024-01234-5"
    },
    {
      id: 2,
      title: "Discovery of novel cell wall-targeting antibiotics from marine bacteria",
      authors: "Thompson K, Garcia R, Polissi A, Wilson R, Martinez S",
      journal: "Nature Chemistry",
      year: 2024,
      area: "screening",
      abstract: "Through systematic screening of marine bacterial extracts, we identified a new class of natural products that specifically target peptidoglycan biosynthesis with potent activity against multidrug-resistant pathogens.",
      doi: "10.1038/s41557-024-01567-8"
    },
    {
      id: 3,
      title: "Coordinated peptidoglycan synthesis and cell division in E. coli",
      authors: "Davis L, Wilson R, Polissi A, Thompson K",
      journal: "Proceedings of the National Academy of Sciences",
      year: 2024,
      area: "peptidoglycan",
      abstract: "We demonstrate how bacterial cells coordinate peptidoglycan synthesis with cell division through a network of protein-protein interactions that ensure proper timing and localization of cell wall biosynthesis.",
      doi: "10.1073/pnas.2024123456"
    },
    {
      id: 4,
      title: "The LptDE complex: gatekeeper of the outer membrane",
      authors: "Johnson M, Polissi A, Brown K, Smith J",
      journal: "Cell",
      year: 2023,
      area: "lps",
      abstract: "Our work reveals the critical role of the LptDE complex as a molecular gatekeeper, controlling the final step of LPS biogenesis and maintaining outer membrane integrity in Gram-negative bacteria.",
      doi: "10.1016/j.cell.2023.11.023"
    },
    {
      id: 5,
      title: "High-throughput screening for LPS biosynthesis inhibitors",
      authors: "Garcia R, Liu X, Polissi A, Davis L",
      journal: "ACS Chemical Biology",
      year: 2023,
      area: "screening",
      abstract: "We developed a high-throughput screening platform for identifying small molecules that disrupt LPS biosynthesis, leading to the discovery of several promising antimicrobial leads.",
      doi: "10.1021/acschembio.3c00234"
    },
    {
      id: 6,
      title: "Structural basis of peptidoglycan crosslinking",
      authors: "Martinez S, Polissi A, Thompson K, Johnson M",
      journal: "Science",
      year: 2023,
      area: "peptidoglycan",
      abstract: "We provide the first structural insights into how transpeptidase enzymes recognize and crosslink peptidoglycan precursors, establishing the molecular basis for cell wall architecture.",
      doi: "10.1126/science.abcd1234"
    }
  ];

  const filteredPublications = selectedArea === "all"
    ? publications
    : publications.filter(pub => pub.area === selectedArea);

  const areas = [
    { id: "all", label: "All Areas" },
    { id: "lps", label: "LPS Biogenesis" },
    { id: "peptidoglycan", label: "Peptidoglycan" },
    { id: "screening", label: "Natural Products" }
  ];

  return (
    <section id="publications" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">scientific contributions</p>
          <h2 className="text-section text-foreground mb-8">
            recent <span className="text-muted-foreground">publications</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Explore our latest research contributions to the fields of bacterial cell biology,
            antimicrobial discovery, and molecular mechanisms of cell envelope biogenesis.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`px-6 py-3 rounded-lg font-medium smooth-transition ${
                selectedArea === area.id
                  ? 'bg-foreground text-background'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground'
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {/* Publications List */}
        <div className="space-y-8">
          {filteredPublications.map((pub, index) => (
            <div
              key={pub.id}
              className="bg-card border border-border rounded-lg p-8 animate-fade-in hover:bg-muted/20 smooth-transition"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-serif italic text-foreground mb-3 leading-tight">
                    {pub.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                    <p className="text-muted-foreground">{pub.authors}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-medium">{pub.journal}</span>
                      <span className="text-muted-foreground">({pub.year})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pub.area === 'lps' ? 'bg-blue-500/20 text-blue-300' :
                    pub.area === 'peptidoglycan' ? 'bg-green-500/20 text-green-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {pub.area === 'lps' ? 'LPS Biogenesis' :
                     pub.area === 'peptidoglycan' ? 'Peptidoglycan' :
                     'Natural Products'}
                  </span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-foreground smooth-transition text-sm font-medium"
                  >
                    DOI: {pub.doi}
                  </a>
                </div>
              </div>

              <details className="group">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground smooth-transition font-medium mb-3 list-none">
                  <span className="flex items-center gap-2">
                    Abstract
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="text-muted-foreground leading-relaxed text-sm pl-6 border-l-2 border-border">
                  {pub.abstract}
                </p>
              </details>
            </div>
          ))}
        </div>

        {/* Load More / View All */}
        <div className="text-center mt-12">
          <button className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg">
            View All Publications
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Publications;
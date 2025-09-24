import { useState } from "react";
import member1Image from "@/assets/membrane-transport.jpg"; // Placeholder for member photos
import member2Image from "@/assets/outer-membrane.jpg";
import member3Image from "@/assets/protein-structure.jpg";
import member4Image from "@/assets/hero-microscopy.jpg";
import member5Image from "@/assets/e-coli-sem.jpg";

const TeamMembers = () => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const teamMembers = [
    {
      id: "paola-sperandeo",
      name: "Paola Sperandeo",
      position: "Associate Professor",
      researchFocus: "LPS Biogenesis & Outer Membrane Assembly",
      image: member1Image,
      email: "paola.sperandeo@unimi.it",
      bio: "Dr. Sperandeo is a leading expert in lipopolysaccharide transport and outer membrane biogenesis. Her research focuses on understanding the molecular mechanisms of LPS assembly and transport in Gram-negative bacteria.",
      expertise: ["LPS Transport Systems", "Structural Biology", "Bacterial Genetics"],
      publications: "45+ peer-reviewed publications",
      currentProjects: ["LptDE Complex Characterization", "Novel LPS Inhibitors"]
    },
    {
      id: "alessandra-martorana",
      name: "Alessandra Martorana",
      position: "Senior Research Scientist",
      researchFocus: "Peptidoglycan Biosynthesis",
      image: member2Image,
      email: "alessandra.martorana@unimi.it",
      bio: "Dr. Martorana specializes in peptidoglycan biosynthesis and cell wall dynamics. Her work focuses on understanding how bacteria coordinate cell wall synthesis with growth and division.",
      expertise: ["Cell Wall Biosynthesis", "Enzyme Kinetics", "Live Cell Imaging"],
      publications: "30+ peer-reviewed publications",
      currentProjects: ["PBP Complex Assembly", "Cell Division Coordination"]
    },
    {
      id: "theresa-strohhammer",
      name: "Theresa Strohhammer",
      position: "Ph.D. Student",
      researchFocus: "Natural Product Screening",
      image: member3Image,
      email: "theresa.strohhammer@unimi.it",
      bio: "Theresa leads our natural product screening efforts, focusing on the discovery and characterization of novel antimicrobial compounds from marine and terrestrial sources.",
      expertise: ["High-Throughput Screening", "Natural Product Chemistry", "Bioactivity Testing"],
      publications: "15+ peer-reviewed publications",
      currentProjects: ["Marine Natural Products Library", "Mechanism of Action Studies"]
    },
    {
      id: "laura-alessandrini",
      name: "Laura Alessandrini",
      position: "Ph.D. Student",
      researchFocus: "Membrane Protein Structure & Function",
      image: member4Image,
      email: "laura.alessandrini@unimi.it",
      bio: "Laura is investigating the structural basis of membrane protein function in bacterial cell envelope biogenesis, using a combination of biochemical and biophysical approaches.",
      expertise: ["Membrane Protein Purification", "Spectroscopy", "Protein Crystallization"],
      publications: "5+ peer-reviewed publications",
      currentProjects: ["Membrane Protein Dynamics", "Protein-Protein Interactions"]
    },
    {
      id: "pierre-charlesworth",
      name: "Pierre Charlesworth",
      position: "Ph.D. Student",
      researchFocus: "Computational Biology & Bioinformatics",
      image: member5Image,
      email: "pierre.charlesworth@unimi.it",
      bio: "Pierre combines computational approaches with experimental biology to understand bacterial systems. His work focuses on developing bioinformatics tools and analyzing large-scale datasets.",
      expertise: ["Bioinformatics", "Data Analysis", "Molecular Modeling"],
      publications: "8+ peer-reviewed publications",
      currentProjects: ["Bacterial Genome Analysis", "Structure Prediction Tools"]
    }
  ];

  const toggleExpanded = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <section id="team-members" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">our scientists</p>
          <h2 className="text-section text-foreground mb-8">
            team <span className="text-muted-foreground">members</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Meet the talented researchers who bring diverse expertise and passion to our laboratory's mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="relative bg-card border border-border rounded-lg overflow-hidden animate-scale-in hover:shadow-lg smooth-transition"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Member Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover smooth-transition hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.researchFocus}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-accent hover:text-foreground smooth-transition text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </a>

                  <button
                    onClick={() => toggleExpanded(member.id)}
                    className="text-muted-foreground hover:text-foreground smooth-transition text-sm flex items-center"
                  >
                    {expandedMember === member.id ? 'Less' : 'More'}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${expandedMember === member.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sliding Expanded Content Panel */}
              <div
                className={`absolute inset-0 bg-card/95 backdrop-blur-sm transition-all duration-500 ease-out ${
                  expandedMember === member.id
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0 pointer-events-none'
                }`}
              >
                <div className="h-full overflow-y-auto p-6">
                  {/* Close Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <button
                      onClick={() => toggleExpanded(member.id)}
                      className="text-muted-foreground hover:text-foreground smooth-transition p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Biography</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Current Projects</h4>
                      <ul className="space-y-1">
                        {member.currentProjects.map((project, idx) => (
                          <li key={idx} className="flex items-start text-muted-foreground text-sm">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0 mt-2"></div>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-accent hover:text-foreground smooth-transition text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </a>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-accent text-sm font-medium">
                        {member.publications}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
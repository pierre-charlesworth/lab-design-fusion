import piImage from "@/assets/protein-structure.jpg"; // Placeholder for PI photo

const PrincipalInvestigator = () => {
  return (
    <section id="principal-investigator" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">leadership</p>
          <h2 className="text-section text-foreground mb-8">
            principal <span className="text-muted-foreground">investigator</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo Section */}
          <div className="animate-scale-in">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={piImage}
                alt="Prof. Alessandra Polissi"
                className="w-full h-96 lg:h-[500px] object-cover smooth-transition hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-40"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="animate-fade-in space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Prof. Alessandra Polissi
              </h3>
              <p className="text-xl text-accent font-medium mb-4">
                Principal Investigator & Laboratory Director
              </p>
              <p className="text-muted-foreground text-lg">
                Department of Pharmacological and Biomolecular Sciences<br />
                University of Milan, Italy
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Research Expertise</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Prof. Polissi leads cutting-edge research in bacterial cell envelope biogenesis,
                  focusing on lipopolysaccharide transport systems, outer membrane assembly mechanisms,
                  and the development of novel antimicrobial strategies. Her work combines structural biology,
                  biochemistry, and microbiology to understand fundamental cellular processes.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Education & Career</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <p className="font-medium">Ph.D. in Molecular Biology</p>
                      <p className="text-sm">University of Milan, Italy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <p className="font-medium">Professor of Microbiology</p>
                      <p className="text-sm">University of Milan (2010-Present)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                    <div>
                      <p className="font-medium">Associate Professor</p>
                      <p className="text-sm">University of Milan (2005-2010)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Selected Honors</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <p>European Molecular Biology Organization (EMBO) Member</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <p>Italian National Research Excellence Award</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <p>Outstanding Contribution to Bacterial Cell Biology</p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6 bg-card">
                <h4 className="text-lg font-semibold text-foreground mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:alessandra.polissi@unimi.it" className="text-accent hover:text-foreground smooth-transition">
                      alessandra.polissi@unimi.it
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-muted-foreground">
                      Via Giuseppe Balzaretti, 9<br />
                      20133 Milan, Italy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalInvestigator;
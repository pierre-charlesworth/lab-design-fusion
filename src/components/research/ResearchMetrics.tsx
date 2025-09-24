const ResearchMetrics = () => {
  const metrics = [
    {
      number: "25+",
      label: "Active Projects",
      description: "Ongoing research initiatives across our three core areas",
    },
    {
      number: "150+",
      label: "Publications",
      description: "Peer-reviewed articles in high-impact journals",
    },
    {
      number: "12",
      label: "Collaborations",
      description: "International research partnerships",
    },
    {
      number: "5",
      label: "Patent Applications",
      description: "Novel discoveries with therapeutic potential",
    },
  ];

  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">our impact</p>
          <h2 className="text-section text-foreground mb-8">
            research <span className="text-muted-foreground">metrics</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-2xl mx-auto">
            Quantifying our contributions to bacterial biology and antimicrobial discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-card border border-border rounded-lg p-6 text-center animate-scale-in hover:bg-muted/20 smooth-transition"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <span className="text-4xl lg:text-5xl font-light text-foreground block mb-2">
                  {metric.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {metric.label}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Highlights */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-8 animate-fade-in">
            <h3 className="text-xl font-semibold text-foreground mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">Nature Publication</p>
                  <p className="text-muted-foreground text-sm">Breakthrough discovery in LPS transport mechanism (2024)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">EU Research Grant</p>
                  <p className="text-muted-foreground text-sm">€2.5M funding for antimicrobial discovery program</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">International Award</p>
                  <p className="text-muted-foreground text-sm">Excellence in Bacterial Cell Biology Research (2023)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 animate-fade-in">
            <h3 className="text-xl font-semibold text-foreground mb-4">Research Infrastructure</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">Advanced Microscopy Suite</p>
                  <p className="text-muted-foreground text-sm">Cryo-EM, super-resolution, and live-cell imaging</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">Mass Spectrometry Core</p>
                  <p className="text-muted-foreground text-sm">Structural proteomics and metabolomics platform</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-foreground font-medium">High-Throughput Screening</p>
                  <p className="text-muted-foreground text-sm">Automated compound screening and analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchMetrics;
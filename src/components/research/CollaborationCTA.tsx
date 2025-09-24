const CollaborationCTA = () => {
  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">join our mission</p>
          <h2 className="text-section text-foreground mb-8">
            collaborate <span className="text-muted-foreground">with us</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We welcome collaborations with researchers, institutions, and industry partners who share
            our passion for advancing bacterial biology and antimicrobial discovery. Together, we can
            accelerate the development of new therapeutic strategies.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Research Collaborations */}
            <div className="bg-card border border-border rounded-lg p-8 text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Research Partnerships</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Partner with us on cutting-edge research projects in bacterial cell biology,
                antimicrobial discovery, and structural biology.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Joint research initiatives
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Co-authored publications
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Shared expertise and resources
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Grant funding opportunities
                </li>
              </ul>
            </div>

            {/* Training Opportunities */}
            <div className="bg-card border border-border rounded-lg p-8 text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Training & Education</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Join our lab as a graduate student, postdoctoral fellow, or visiting scientist
                to advance your career in microbiology research.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Graduate student positions
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Postdoctoral fellowships
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Visiting scientist programs
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                  Technical training workshops
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/contact"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Get In Touch
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="#publications"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              View Our Work
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationCTA;
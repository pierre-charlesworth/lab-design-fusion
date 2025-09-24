const JoinUs = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">career opportunities</p>
          <h2 className="text-section text-foreground mb-8">
            join <span className="text-muted-foreground">our team</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We're always looking for talented, passionate scientists to join our research family.
            Whether you're a graduate student, postdoc, or established researcher, we welcome
            inquiries about opportunities in our laboratory.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Current Opportunities */}
            <div className="bg-card border border-border rounded-lg p-8 text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Open Positions</h3>
              </div>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Postdoctoral Researcher</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Position available for research in LPS biogenesis and outer membrane assembly.
                    Experience in structural biology and protein purification preferred.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      Open
                    </span>
                    <span className="text-muted-foreground text-xs">Full-time, 2 years</span>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Ph.D. Student Position</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Seeking motivated Ph.D. candidate for natural product screening and antimicrobial
                    discovery project. Strong background in chemistry or microbiology required.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      Open
                    </span>
                    <span className="text-muted-foreground text-xs">3-4 years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Offer */}
            <div className="bg-card border border-border rounded-lg p-8 text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">What We Offer</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Cutting-edge Research Environment</p>
                    <p>Access to state-of-the-art equipment and facilities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">International Collaborations</p>
                    <p>Opportunities to work with leading labs worldwide</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Professional Development</p>
                    <p>Training in advanced techniques and career mentorship</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Publication Opportunities</p>
                    <p>Support for publishing in high-impact journals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Competitive Compensation</p>
                    <p>Fellowships and stipends at competitive rates</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-secondary/20 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">How to Apply</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Interested candidates should send a CV, cover letter describing research interests,
              and contact information for two references to Prof. Alessandra Polissi.
              We encourage applications from candidates with diverse backgrounds and experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:alessandra.polissi@unimi.it?subject=Laboratory Position Inquiry"
                className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
              >
                Apply Now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="/contact"
                className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
              >
                Contact Us
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Diversity Statement */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm italic max-w-2xl mx-auto">
              The Polissi Laboratory is committed to fostering an inclusive environment where scientists
              from all backgrounds can thrive. We welcome applications regardless of race, gender,
              nationality, religion, or sexual orientation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
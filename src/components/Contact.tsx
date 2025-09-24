
const Contact = () => {

  return (
    <section id="contact" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">get in touch</p>
          <h2 className="text-section text-foreground mb-8">
            contact <span className="text-muted-foreground">information</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate or have questions about our research? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="animate-scale-in">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Lab Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Location</p>
                      <p className="text-muted-foreground">Via Giuseppe Balzaretti, 9<br />20133 Milan MI</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Email</p>
                      <p className="text-muted-foreground">research@polissilab.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">
                  Research Opportunities
                </h4>
                <p className="text-muted-foreground">
                  We welcome inquiries from prospective graduate students, postdocs, 
                  and collaborators. Please include your research interests and 
                  relevant experience in your message.
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card border border-border rounded-lg overflow-hidden h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.829!2d9.2277!3d45.4924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c15b8b5c6d39%3A0x5d4f5c5a1f8b5c5a!2sVia%20Giuseppe%20Balzaretti%2C%209%2C%2020133%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px]"
                title="Lab Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
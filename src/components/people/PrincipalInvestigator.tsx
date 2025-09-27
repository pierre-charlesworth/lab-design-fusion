import { useState, useEffect } from "react";
import { client, queries, urlFor, type PrincipalInvestigator as PIType } from "@/lib/sanity";
import piImage from "@/assets/protein-structure.jpg"; // Fallback image

const PrincipalInvestigator = () => {
  const [pi, setPi] = useState<PIType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPI = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<PIType>(queries.principalInvestigator);
        setPi(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching PI data:', err);
        setError('Failed to load PI information');
      } finally {
        setLoading(false);
      }
    };

    fetchPI();
  }, []);

  return (
    <section id="principal-investigator" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">leadership</p>
          <h2 className="text-section text-foreground mb-8">
            principal <span className="text-muted-foreground">investigator</span>
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading PI information...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && pi && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div className="animate-scale-in">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={pi.image ? urlFor(pi.image).width(600).height(500).url() : piImage}
                  alt={pi.name}
                  className="w-full h-96 lg:h-[500px] object-cover smooth-transition hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-40"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="animate-fade-in space-y-8">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {pi.name}
                </h3>
                <p className="text-xl text-accent font-medium mb-4">
                  {pi.title}
                </p>
                <p className="text-muted-foreground text-lg">
                  {pi.department}<br />
                  {pi.institution}
                </p>
              </div>

              <div className="space-y-6">
                {pi.researchExpertise && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Research Expertise</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {pi.researchExpertise}
                    </p>
                  </div>
                )}

                {pi.education && pi.education.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Education & Career</h4>
                    <div className="space-y-2 text-muted-foreground">
                      {pi.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm">{edu.institution}{edu.period ? ` (${edu.period})` : ''}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pi.honors && pi.honors.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Selected Honors</h4>
                    <div className="space-y-2 text-muted-foreground">
                      {pi.honors.map((honor, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                          <p>{honor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border border-border rounded-lg p-6 bg-card">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    {pi.email && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${pi.email}`} className="text-accent hover:text-foreground smooth-transition">
                          {pi.email}
                        </a>
                      </div>
                    )}
                    {pi.address && (
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-muted-foreground">
                          {pi.address.street}<br />
                          {pi.address.city} {pi.address.postalCode}<br />
                          {pi.address.country}
                        </p>
                      </div>
                    )}
                    {pi.officeHours && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-muted-foreground">{pi.officeHours}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrincipalInvestigator;
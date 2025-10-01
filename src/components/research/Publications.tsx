import { useState, useEffect } from "react";
import { client, queries, type Publication } from "@/lib/sanity";

// Helper function to generate author string from authorList
const generateAuthorString = (publication: Publication): string => {
  // Use override if provided
  if (publication.authors) {
    return publication.authors;
  }

  // Generate from authorList
  if (publication.authorList && publication.authorList.length > 0) {
    return publication.authorList
      .map(author => {
        const name = author.type === 'teamMember'
          ? author.teamMember?.name
          : author.type === 'principalInvestigator'
          ? author.principalInvestigator?.name
          : author.externalName;
        return author.isCorresponding ? `${name}*` : name;
      })
      .filter(Boolean)
      .join(', ');
  }

  return 'Unknown authors';
};

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Publication[]>(queries.publications);
        // Get only the 3 most recent publications
        setPublications(data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <section id="publications" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">scientific contributions</p>
          <h2 className="text-section text-foreground mb-8">
            latest <span className="text-muted-foreground">publications</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Highlights from our recent research contributions to bacterial cell biology,
            antimicrobial discovery, and molecular mechanisms of cell envelope biogenesis.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading publications...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <>
        {/* Publications List */}
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div
              key={pub._id}
              className="bg-card border border-border rounded-lg p-8 animate-fade-in hover:bg-muted/20 smooth-transition"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-serif italic text-foreground mb-3 leading-tight">
                    {pub.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                    <p className="text-muted-foreground">{generateAuthorString(pub)}</p>
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
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-foreground smooth-transition text-sm font-medium"
                    >
                      DOI: {pub.doi}
                    </a>
                  )}
                </div>
              </div>

              {pub.abstract && (
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
              )}
            </div>
          ))}
        </div>

            {/* View All Publications */}
            <div className="text-center mt-12">
              <a
                href="/publications"
                className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
              >
                View All Publications
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Publications;
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
  const [selectedArea, setSelectedArea] = useState("all");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Publication[]>(queries.publications);
        setPublications(data);
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

            {/* Load More / View All */}
            <div className="text-center mt-12">
              <button className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg">
                View All Publications
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Publications;
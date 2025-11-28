import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client, queries, urlFor, type ResearchArea, type Publication } from "@/lib/sanity";
import lpsImage from "@/assets/protein-structure.jpg";
import peptidoglycanImage from "@/assets/membrane-transport.jpg";
import screeningImage from "@/assets/outer-membrane.jpg";

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
          : author.externalName;
        return author.isCorresponding ? `${name}*` : name;
      })
      .filter(Boolean)
      .join(', ');
  }

  return 'Unknown authors';
};

// Fallback images mapping
const getFallbackImage = (areaId: string) => {
  const imageMap = {
    'lps': lpsImage,
    'peptidoglycan': peptidoglycanImage,
    'screening': screeningImage
  };
  return imageMap[areaId as keyof typeof imageMap] || lpsImage;
};

const ResearchAreaDetails = () => {
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<{
    image: any;
    title: string;
    caption?: string;
    altText?: string;
  } | null>(null);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedFigure) {
        setSelectedFigure(null);
      }
    };

    if (selectedFigure) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedFigure]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [areasData, publicationsData] = await Promise.all([
          client.fetch<ResearchArea[]>(queries.researchAreas),
          client.fetch<Publication[]>(queries.publications)
        ]);
        setResearchAreas(areasData);
        setPublications(publicationsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching research areas:', err);
        setError('Failed to load research areas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter publications by area
  const getPublicationsByArea = (areaSlug: string): Publication[] => {
    // Map slug to area values used in publications
    // Map slug to area values used in publications
    const areaMapping = {
      'lps-biogenesis-and-transport': 'lps',
      'peptidoglycan-remodeling-under-outer-membrane-stress': 'peptidoglycan',
      'antimicrobial-discovery': 'screening'
    };

    const areaValue = areaMapping[areaSlug as keyof typeof areaMapping] || areaSlug;
    return publications.filter(pub => pub.area === areaValue).slice(0, 3); // Limit to 3 most recent
  };

  if (loading) {
    return (
      <section id="research-areas" className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading research areas...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="research-areas" className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research-areas" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">in depth analysis</p>
          <h2 className="text-section text-foreground mb-8">
            research <span className="text-muted-foreground">areas</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Dive deeper into our three core research areas, exploring the methodologies,
            current projects, and discoveries that drive our scientific mission.
          </p>
        </div>

        <div className="space-y-24">
          {researchAreas.map((area, index) => {
            const areaPublications = getPublicationsByArea(area.slug.current);

            return (
              <div
                key={area._id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {/* Image Section */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={area.image ? urlFor(area.image).width(600).height(400).url() : getFallbackImage(area.slug.current)}
                      alt={area.title}
                      className="w-full h-80 lg:h-96 object-cover smooth-transition hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{area.title}</h3>
                      {area.subtitle && (
                        <p className="text-white/90 text-sm font-light tracking-wide">{area.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                      <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                      <TabsTrigger value="figures" className="text-xs">Figures</TabsTrigger>
                      <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                      <TabsTrigger value="publications" className="text-xs">Papers</TabsTrigger>
                    </TabsList>

                    <div className="h-80 lg:h-96 overflow-y-auto pr-2 custom-scrollbar">
                      <TabsContent value="overview" className="space-y-4 mt-0">
                        <p className="text-muted-foreground leading-relaxed text-justify">
                          {area.detailedDescription || area.description || 'No description available.'}
                        </p>
                      </TabsContent>

                      <TabsContent value="figures" className="space-y-4 mt-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {area.figures && area.figures.length > 0 ? (
                            area.figures.map((figure, idx) => (
                              <div
                                key={idx}
                                className="cursor-pointer group"
                                onClick={() => setSelectedFigure(figure)}
                              >
                                <div className="relative overflow-hidden rounded-lg bg-card border border-border">
                                  <img
                                    src={urlFor(figure.image).width(300).height(200).url()}
                                    alt={figure.altText || figure.title}
                                    className="w-full h-32 object-cover smooth-transition group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 smooth-transition">
                                    <p className="text-white text-xs font-medium truncate">{figure.title}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 text-center truncate">
                                  {figure.title}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8">
                              <p className="text-muted-foreground text-sm">No figures available.</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="projects" className="space-y-4 mt-0">
                        <div className="space-y-4">
                          {area.currentProjects && area.currentProjects.length > 0 ? (
                            area.currentProjects.map((project, idx) => (
                              <div key={idx} className="border border-border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                                      project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                                        'bg-yellow-500/20 text-yellow-300'
                                    }`}>
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm">{project.description}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm">No current projects listed.</p>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="publications" className="space-y-4 mt-0">
                        <div className="space-y-4">
                          {areaPublications.length > 0 ? (
                            areaPublications.map((pub, idx) => (
                              <div key={pub._id} className="border border-border rounded-lg p-4">
                                <h4 className="font-serif italic text-foreground mb-2">{pub.title}</h4>
                                <p className="text-muted-foreground text-sm mb-1">{generateAuthorString(pub)}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <p className="text-accent text-sm font-medium">{pub.journal} ({pub.year})</p>
                                  {pub.doi && (
                                    <a
                                      href={`https://doi.org/${pub.doi}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                    >
                                      DOI
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm">No publications found for this area.</p>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Figure Modal */}
      {selectedFigure && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFigure(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFigure(null)}
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background text-foreground rounded-full p-2 smooth-transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3">
                <img
                  src={urlFor(selectedFigure.image).width(800).height(600).url()}
                  alt={selectedFigure.altText || selectedFigure.title}
                  className="w-full h-auto max-h-[60vh] lg:max-h-[80vh] object-contain"
                />
              </div>

              <div className="lg:w-1/3 p-6 lg:max-h-[80vh] lg:overflow-y-auto">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {selectedFigure.title}
                </h3>
                {selectedFigure.caption && (
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {selectedFigure.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchAreaDetails;
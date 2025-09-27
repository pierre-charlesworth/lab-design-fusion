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
    const areaMapping = {
      'lps-biogenesis': 'lps',
      'peptidoglycan-biosynthesis': 'peptidoglycan',
      'natural-product-screening': 'screening'
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
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
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
                      <TabsTrigger value="methods" className="text-xs">Methods</TabsTrigger>
                      <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                      <TabsTrigger value="publications" className="text-xs">Papers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {area.detailedDescription || area.description || 'No description available.'}
                      </p>
                    </TabsContent>

                    <TabsContent value="methods" className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {area.methods && area.methods.length > 0 ? (
                          area.methods.map((method, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                              <span className="text-muted-foreground text-sm">{method}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No methods listed.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4">
                      <div className="space-y-4">
                        {area.currentProjects && area.currentProjects.length > 0 ? (
                          area.currentProjects.map((project, idx) => (
                            <div key={idx} className="border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-foreground">{project.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  project.status === 'Active' ? 'bg-green-500/20 text-green-300' :
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

                    <TabsContent value="publications" className="space-y-4">
                      <div className="space-y-4">
                        {areaPublications.length > 0 ? (
                          areaPublications.map((pub, idx) => (
                            <div key={pub._id} className="border border-border rounded-lg p-4">
                              <h4 className="font-serif italic text-foreground mb-2">{pub.title}</h4>
                              <p className="text-muted-foreground text-sm mb-1">{generateAuthorString(pub)}</p>
                              <p className="text-accent text-sm font-medium">{pub.journal} ({pub.year})</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No publications found for this area.</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreaDetails;
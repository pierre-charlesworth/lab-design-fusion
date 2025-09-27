import { useState, useEffect } from "react";
import { client, queries, urlFor, type ResearchArea } from "@/lib/sanity";
import lpsImage from "@/assets/protein-structure.jpg";
import peptidoglycanImage from "@/assets/membrane-transport.jpg";
import screeningImage from "@/assets/outer-membrane.jpg";

// Fallback images mapping
const getFallbackImage = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('lps') || titleLower.includes('lipopolysaccharide')) return lpsImage;
  if (titleLower.includes('peptidoglycan')) return peptidoglycanImage;
  if (titleLower.includes('screening') || titleLower.includes('natural')) return screeningImage;
  return lpsImage; // default
};

const Research = () => {
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchResearchAreas = async () => {
      try {
        setLoading(true);
        setDebugInfo(`Client config: projectId=${client.config().projectId}, dataset=${client.config().dataset}`);
        const data = await client.fetch<ResearchArea[]>(queries.researchAreas);
        setResearchAreas(data);
        setDebugInfo(prev => prev + ` | Fetched ${data.length} research areas`);
        setError(null);
      } catch (err) {
        console.error('Error fetching research areas:', err);
        setError(`Failed to load research areas: ${err}`);
        setDebugInfo(prev => prev + ` | Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchAreas();
  }, []);

  return (
    <section id="research" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">selected works</p>
          <h2 className="text-section text-foreground mb-8">
            research <span className="text-muted-foreground">areas</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            We focus on bacterial cell envelope biogenesis and antimicrobial discovery, combining
            biochemical, genetic, and screening approaches to understand and target essential cellular processes.
          </p>
          {/* Debug info */}
          <div className="text-xs text-red-500 mt-4 p-2 bg-red-50 rounded max-w-4xl mx-auto">
            <div><strong>DEBUG v3:</strong></div>
            <div>Config: {debugInfo}</div>
            <div>Areas: {researchAreas.length} | Loading: {loading.toString()}</div>
            <div>Domain: {window.location.hostname}</div>
            {error && <div className="text-red-700 font-bold">Error: {error}</div>}
            <div className="mt-2 text-blue-600">
              ⚠️ If you see request errors, add <strong>{window.location.origin}</strong> to CORS origins in Sanity manage console
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading research areas...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {/* Research Areas Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <a
                href={`/research#research-areas`}
                key={area._id}
                className="research-card bg-card border border-border rounded-lg overflow-hidden animate-scale-in hover:shadow-lg hover:border-accent smooth-transition cursor-pointer group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={area.image ? urlFor(area.image).width(400).height(256).url() : getFallbackImage(area.title)}
                    alt={area.title}
                    className="w-full h-full object-cover smooth-transition group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent smooth-transition">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description || 'Explore this research area to learn more about our work.'}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-display text-muted-foreground mb-6">
            Interested in learning more about our detailed research programs?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/research"
              className="btn-primary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Explore Research Details
            </a>
            <a
              href="#contact"
              className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
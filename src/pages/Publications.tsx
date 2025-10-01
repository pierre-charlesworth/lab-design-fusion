import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PublicationsHero from "@/components/publications/PublicationsHero";
import PublicationFilters from "@/components/publications/PublicationFilters";
import PublicationsList from "@/components/publications/PublicationsList";
import { client, queries, type Publication, type TeamMember } from "@/lib/sanity";

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pubsData, membersData] = await Promise.all([
          client.fetch<Publication[]>(queries.publications),
          client.fetch<TeamMember[]>(queries.teamMembers)
        ]);
        setPublications(pubsData);
        setTeamMembers(membersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get available years from publications
  const availableYears = useMemo(() => {
    const years = publications.map(pub => pub.year).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [publications]);

  // Filter team members to only those with publications
  const authorsWithPublications = useMemo(() => {
    const authorIds = new Set<string>();
    publications.forEach(pub => {
      pub.authorList?.forEach(author => {
        if (author.type === 'teamMember' && author.teamMember?._id) {
          authorIds.add(author.teamMember._id);
        } else if (author.type === 'principalInvestigator' && author.principalInvestigator?._id) {
          authorIds.add(author.principalInvestigator._id);
        }
      });
    });
    return teamMembers.filter(member => authorIds.has(member._id));
  }, [publications, teamMembers]);

  // Filter publications
  const filteredPublications = useMemo(() => {
    let filtered = publications;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pub =>
        pub.title?.toLowerCase().includes(query) ||
        pub.authors?.toLowerCase().includes(query) ||
        pub.journal?.toLowerCase().includes(query) ||
        pub.abstract?.toLowerCase().includes(query) ||
        pub.authorList?.some(author =>
          author.teamMember?.name?.toLowerCase().includes(query) ||
          author.principalInvestigator?.name?.toLowerCase().includes(query) ||
          author.externalName?.toLowerCase().includes(query)
        )
      );
    }

    // Filter by research area
    if (selectedArea !== "all") {
      filtered = filtered.filter(pub => pub.area === selectedArea);
    }

    // Filter by author
    if (selectedAuthor !== "all") {
      filtered = filtered.filter(pub =>
        pub.authorList?.some(author =>
          (author.type === 'teamMember' && author.teamMember?._id === selectedAuthor) ||
          (author.type === 'principalInvestigator' && author.principalInvestigator?._id === selectedAuthor)
        )
      );
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(pub => pub.year?.toString() === selectedYear);
    }

    return filtered;
  }, [publications, searchQuery, selectedArea, selectedAuthor, selectedYear]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedArea("all");
    setSelectedAuthor("all");
    setSelectedYear("all");
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedArea !== "all" ||
    selectedAuthor !== "all" ||
    selectedYear !== "all" ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PublicationsHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={publications.length}
          filteredCount={filteredPublications.length}
        />

        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            {/* Filters */}
            <div className="mb-12">
              <PublicationFilters
                selectedArea={selectedArea}
                selectedAuthor={selectedAuthor}
                selectedYear={selectedYear}
                onAreaChange={setSelectedArea}
                onAuthorChange={setSelectedAuthor}
                onYearChange={setSelectedYear}
                teamMembers={authorsWithPublications}
                availableYears={availableYears}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            {/* Publications List */}
            <PublicationsList
              publications={filteredPublications}
              loading={loading}
              error={error}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Publications;
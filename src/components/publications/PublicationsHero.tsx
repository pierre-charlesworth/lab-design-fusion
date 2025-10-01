import { useState } from "react";

interface PublicationsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

const PublicationsHero = ({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount
}: PublicationsHeroProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="pt-32 pb-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">scientific contributions</p>
          <h1 className="text-section text-foreground mb-6">
            publications
          </h1>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive collection of our research contributions to bacterial cell biology,
            antimicrobial discovery, and molecular mechanisms of cell envelope biogenesis.
          </p>

          {/* Publication Count */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <span className="font-medium text-foreground">{filteredCount}</span>
            {filteredCount !== totalCount && (
              <>
                <span>of</span>
                <span className="font-medium">{totalCount}</span>
              </>
            )}
            <span>{filteredCount === 1 ? 'publication' : 'publications'}</span>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className={`relative group ${isFocused ? 'ring-2 ring-accent rounded-lg' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-muted-foreground group-focus-within:text-accent smooth-transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search by title, author, journal, or keywords..."
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent smooth-transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground smooth-transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredCount > 0
                  ? `Found ${filteredCount} ${filteredCount === 1 ? 'result' : 'results'} for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsHero;
import { useState } from "react";
import type { Publication } from "@/lib/sanity";
import PublicationCard from "./PublicationCard";

interface PublicationsListProps {
  publications: Publication[];
  loading: boolean;
  error: string | null;
}

const INITIAL_DISPLAY_COUNT = 15;
const LOAD_MORE_INCREMENT = 10;

const PublicationsList = ({ publications, loading, error }: PublicationsListProps) => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-muted-foreground">Loading publications...</p>
      </div>
    );
  }

  // Error State
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          className="w-16 h-16 text-muted-foreground mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-500 font-medium mb-2">Error Loading Publications</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  // Empty State
  if (!publications || publications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          className="w-16 h-16 text-muted-foreground mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-foreground font-medium mb-2">No Publications Found</p>
        <p className="text-muted-foreground text-sm text-center max-w-md">
          No publications match your current filters. Try adjusting your search criteria or clearing filters.
        </p>
      </div>
    );
  }

  const visiblePublications = publications.slice(0, displayCount);
  const hasMore = displayCount < publications.length;
  const remainingCount = publications.length - displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_INCREMENT, publications.length));
  };

  // Publications List
  return (
    <>
      <div className="space-y-6">
        {visiblePublications.map((pub, index) => (
          <PublicationCard key={pub._id} publication={pub} index={index} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Showing {displayCount} of {publications.length} publications
            {remainingCount > 0 && ` • ${remainingCount} more available`}
          </p>
          <button
            onClick={handleLoadMore}
            className="btn-secondary inline-flex items-center px-8 py-3 font-semibold rounded-lg"
          >
            Load More Publications
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* All publications loaded message */}
      {!hasMore && publications.length > INITIAL_DISPLAY_COUNT && (
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            All {publications.length} publications displayed
          </p>
        </div>
      )}
    </>
  );
};

export default PublicationsList;
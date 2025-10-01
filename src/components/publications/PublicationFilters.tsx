import { useState } from "react";
import type { TeamMember } from "@/lib/sanity";

interface FilterOption {
  id: string;
  label: string;
}

interface PublicationFiltersProps {
  selectedArea: string;
  selectedAuthor: string;
  selectedYear: string;
  onAreaChange: (area: string) => void;
  onAuthorChange: (author: string) => void;
  onYearChange: (year: string) => void;
  teamMembers: TeamMember[];
  availableYears: number[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const PublicationFilters = ({
  selectedArea,
  selectedAuthor,
  selectedYear,
  onAreaChange,
  onAuthorChange,
  onYearChange,
  teamMembers,
  availableYears,
  onClearFilters,
  hasActiveFilters
}: PublicationFiltersProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const researchAreas: FilterOption[] = [
    { id: "all", label: "All Projects" },
    { id: "lps", label: "LPS Biogenesis" },
    { id: "peptidoglycan", label: "Peptidoglycan" },
    { id: "screening", label: "Natural Products" }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedArea !== "all" && (
            <button
              onClick={() => onAreaChange("all")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent hover:bg-accent/30 smooth-transition"
            >
              {researchAreas.find(a => a.id === selectedArea)?.label}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {selectedAuthor !== "all" && (
            <button
              onClick={() => onAuthorChange("all")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent hover:bg-accent/30 smooth-transition"
            >
              {teamMembers.find(m => m._id === selectedAuthor)?.name}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {selectedYear !== "all" && (
            <button
              onClick={() => onYearChange("all")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent hover:bg-accent/30 smooth-transition"
            >
              {selectedYear}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground smooth-transition underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Research Areas */}
        <div className="bg-card border border-border rounded-lg p-4">
          <button
            onClick={() => toggleSection('area')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-foreground">Research Area</h3>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSection === 'area' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {(expandedSection === 'area' || !expandedSection) && (
            <div className="mt-3 space-y-2">
              {researchAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => onAreaChange(area.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                    selectedArea === area.id
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Authors */}
        <div className="bg-card border border-border rounded-lg p-4">
          <button
            onClick={() => toggleSection('author')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-foreground">Author</h3>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSection === 'author' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {(expandedSection === 'author' || !expandedSection) && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
              <button
                onClick={() => onAuthorChange("all")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                  selectedAuthor === "all"
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                All Authors
              </button>
              {teamMembers.map(member => (
                <button
                  key={member._id}
                  onClick={() => onAuthorChange(member._id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                    selectedAuthor === member._id
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {member.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Years */}
        <div className="bg-card border border-border rounded-lg p-4">
          <button
            onClick={() => toggleSection('year')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-foreground">Year</h3>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSection === 'year' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {(expandedSection === 'year' || !expandedSection) && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
              <button
                onClick={() => onYearChange("all")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                  selectedYear === "all"
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                All Years
              </button>
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => onYearChange(year.toString())}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm smooth-transition ${
                    selectedYear === year.toString()
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationFilters;
import type { Publication } from "@/lib/sanity";

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

        // Bold team members for visual distinction
        const formattedName = author.type === 'teamMember' || author.type === 'principalInvestigator'
          ? `**${name}**`
          : name;

        return author.isCorresponding ? `${formattedName}*` : formattedName;
      })
      .filter(Boolean)
      .join(', ');
  }

  return 'Unknown authors';
};

// Helper to parse author string with bold markers
const parseAuthors = (authorString: string) => {
  const parts = authorString.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const name = part.slice(2, -2);
      return <strong key={i} className="font-semibold text-foreground">{name}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

interface PublicationCardProps {
  publication: Publication;
  index?: number;
}

const PublicationCard = ({ publication, index = 0 }: PublicationCardProps) => {
  const authorString = generateAuthorString(publication);

  return (
    <div
      className="bg-card border border-border rounded-lg p-8 animate-fade-in hover:bg-muted/20 smooth-transition"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-serif italic text-foreground mb-3 leading-tight">
            {publication.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {parseAuthors(authorString)}
          </p>
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-accent font-medium">{publication.journal}</span>
            <span className="text-muted-foreground">({publication.year})</span>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-2">
          {publication.area && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              publication.area === 'lps' ? 'bg-blue-500/20 text-blue-300' :
              publication.area === 'peptidoglycan' ? 'bg-green-500/20 text-green-300' :
              'bg-purple-500/20 text-purple-300'
            }`}>
              {publication.area === 'lps' ? 'LPS Biogenesis' :
               publication.area === 'peptidoglycan' ? 'Peptidoglycan' :
               'Natural Products'}
            </span>
          )}
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-foreground smooth-transition text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {publication.doi}
            </a>
          )}
        </div>
      </div>

      {publication.abstract && (
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
          <p className="text-muted-foreground leading-relaxed text-sm pl-6 border-l-2 border-border mt-2">
            {publication.abstract}
          </p>
        </details>
      )}
    </div>
  );
};

export default PublicationCard;
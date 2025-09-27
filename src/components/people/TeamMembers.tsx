import { useState, useEffect } from "react";
import { client, queries, urlFor, type TeamMember, type Publication } from "@/lib/sanity";
import member1Image from "@/assets/membrane-transport.jpg"; // Fallback images

// Generate a default avatar with initials
const generateDefaultAvatar = (name: string): string => {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  // Generate a simple SVG avatar with initials
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f1f5f9"/>
      <circle cx="200" cy="120" r="50" fill="#64748b"/>
      <text x="200" y="130" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">
        ${initials}
      </text>
      <rect x="150" y="180" width="100" height="80" rx="50" fill="#64748b"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Component for displaying member publications
const MemberPublications = ({ memberId, maxPublications = 5, yearsLimit = 0 }: {
  memberId: string;
  maxPublications?: number;
  yearsLimit?: number;
}) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        let query = queries.memberPublications;

        // Add year filtering if specified
        if (yearsLimit > 0) {
          const cutoffYear = new Date().getFullYear() - yearsLimit;
          query = `*[_type == "publication" && $memberId in authorList[type == "teamMember"].teamMember._ref && year >= ${cutoffYear}] | order(year desc) {
            _id, title, authors, authorList[]{ type, teamMember->{_id, name}, externalName, isCorresponding },
            journal, year, area, abstract, doi, featured, publishedAt
          }`;
        }

        const data = await client.fetch<Publication[]>(query, { memberId });

        // Apply max publications limit
        const limitedData = maxPublications > 0 ? data.slice(0, maxPublications) : data;
        setPublications(limitedData);
      } catch (err) {
        console.error('Error fetching member publications:', err);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchPublications();
    }
  }, [memberId, maxPublications, yearsLimit]);

  if (loading) {
    return <div className="text-xs text-muted-foreground">Loading publications...</div>;
  }

  if (publications.length === 0) {
    return null;
  }

  const displayPublications = expanded ? publications : publications.slice(0, 3);

  return (
    <div>
      <h4 className="font-semibold text-foreground mb-2 text-sm">Recent Publications</h4>
      <div className="space-y-2">
        {displayPublications.map((pub) => (
          <div key={pub._id} className="text-xs">
            <p className="text-foreground font-medium leading-tight">{pub.title}</p>
            <p className="text-muted-foreground">
              <span className="font-medium">{pub.journal}</span> ({pub.year})
            </p>
          </div>
        ))}
        {publications.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-accent hover:text-foreground smooth-transition"
          >
            {expanded ? 'Show less' : `Show ${publications.length - 3} more`}
          </button>
        )}
      </div>
    </div>
  );
};

const TeamMembers = () => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<TeamMember[]>(queries.teamMembers);
        setTeamMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError(`Failed to load team members: ${err.message || 'Network error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const toggleExpanded = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <section id="team-members" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-caption text-muted-foreground mb-4">our scientists</p>
          <h2 className="text-section text-foreground mb-8">
            team <span className="text-muted-foreground">members</span>
          </h2>
          <p className="text-display text-muted-foreground max-w-3xl mx-auto">
            Meet the talented researchers who bring diverse expertise and passion to our laboratory's mission.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading team members...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {/* Team Members Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member._id}
                className="relative bg-card border border-border rounded-lg overflow-hidden animate-scale-in hover:shadow-lg smooth-transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Member Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image ? urlFor(member.image).width(400).height(300).url() : generateDefaultAvatar(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover smooth-transition hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-2">
                    {member.position}
                  </p>
                  {member.researchFocus && (
                    <p className="text-muted-foreground text-sm mb-4">
                      {member.researchFocus}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-accent hover:text-foreground smooth-transition text-sm flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact
                        </a>
                      )}

                      {member.publicationCount !== undefined && member.publicationCount > 0 && (
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md font-medium">
                          {member.publicationCount} publication{member.publicationCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExpanded(member._id)}
                      className="text-muted-foreground hover:text-foreground smooth-transition text-sm flex items-center"
                    >
                      {expandedMember === member._id ? 'Less' : 'More'}
                      <svg
                        className={`w-4 h-4 ml-1 transition-transform ${expandedMember === member._id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Sliding Expanded Content Panel */}
                <div
                  className={`absolute inset-0 bg-card/95 backdrop-blur-sm transition-all duration-500 ease-out ${
                    expandedMember === member._id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-full opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="h-full overflow-y-auto p-6">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <button
                        onClick={() => toggleExpanded(member._id)}
                        className="text-muted-foreground hover:text-foreground smooth-transition p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {member.bio && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Biography</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {member.bio}
                          </p>
                        </div>
                      )}

                      {member.expertise && member.expertise.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {member.currentProjects && member.currentProjects.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Current Projects</h4>
                          <ul className="space-y-1">
                            {member.currentProjects.map((project, idx) => (
                              <li key={idx} className="flex items-start text-muted-foreground text-sm">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0 mt-2"></div>
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {member.email && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                          <a
                            href={`mailto:${member.email}`}
                            className="text-accent hover:text-foreground smooth-transition text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {member.email}
                          </a>
                        </div>
                      )}

                      {member.showPublications !== false && (
                        <div className="pt-2 border-t border-border">
                          <MemberPublications
                            memberId={member._id}
                            maxPublications={member.publicationSettings?.maxPublications || 5}
                            yearsLimit={member.publicationSettings?.yearsLimit || 0}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembers;
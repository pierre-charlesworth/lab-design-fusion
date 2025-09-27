import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types'

export const client = createClient({
  projectId: 'fe6bomwn',
  dataset: 'production',
  useCdn: false, // Disable CDN to avoid CORS issues in development
  apiVersion: '2024-01-01', // API version
  token: undefined, // No token needed for read-only access
})

// Set up image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Queries
export const queries = {
  teamMembers: `*[_type == "teamMember" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    position,
    researchFocus,
    image,
    email,
    bio,
    expertise,
    publications,
    currentProjects,
    order,
    isActive,
    showPublications,
    publicationSettings,
    "publicationCount": count(*[_type == "publication" && ^._id in authorList[type == "teamMember"].teamMember._ref])
  }`,

  publications: `*[_type == "publication"] | order(year desc) {
    _id,
    title,
    authors,
    authorList[]{
      type,
      teamMember->{_id, name},
      principalInvestigator->{_id, name},
      externalName,
      isCorresponding
    },
    journal,
    year,
    area,
    abstract,
    doi,
    featured,
    publishedAt
  }`,

  memberPublications: `*[_type == "publication" && $memberId in authorList[type == "teamMember"].teamMember._ref] | order(year desc) {
    _id,
    title,
    authors,
    authorList[]{
      type,
      teamMember->{_id, name},
      principalInvestigator->{_id, name},
      externalName,
      isCorresponding
    },
    journal,
    year,
    area,
    abstract,
    doi,
    featured,
    publishedAt
  }`,

  researchAreas: `*[_type == "researchArea"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    detailedDescription,
    image,
    methods,
    currentProjects,
    keyFindings,
    order
  }`,

  contactInfo: `*[_type == "contactInfo"][0] {
    _id,
    title,
    headerTitle,
    headerSubtitle,
    labName,
    address,
    email,
    phone,
    googleMapsEmbed,
    researchOpportunities,
    officeHours
  }`,

  heroSection: `*[_type == "heroSection" && page == $page][0] {
    _id,
    page,
    backgroundImage,
    tagline,
    title,
    subtitle,
    primaryButton,
    secondaryButton,
    showScrollIndicator
  }`,

  principalInvestigator: `*[_type == "principalInvestigator"][0] {
    _id,
    name,
    title,
    department,
    institution,
    image,
    researchExpertise,
    education,
    honors,
    email,
    address,
    officeHours,
    showPublications,
    publicationSettings,
    "publicationCount": count(*[_type == "publication" && ^._id in authorList[type == "teamMember"].teamMember._ref])
  }`,

  // Query for all team members (including inactive) for publication authoring
  allTeamMembers: `*[_type == "teamMember"] | order(name asc) {
    _id,
    name,
    position,
    isActive
  }`,
}

// Types for TypeScript
export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  position: string
  researchFocus?: string
  image?: any
  email?: string
  bio?: string
  expertise?: string[]
  publications?: string
  currentProjects?: string[]
  order?: number
  isActive?: boolean
  showPublications?: boolean
  publicationSettings?: {
    maxPublications: number
    yearsLimit: number
  }
  publicationCount?: number
}

export interface Publication {
  _id: string
  title: string
  authors?: string
  authorList?: Array<{
    type: 'teamMember' | 'principalInvestigator' | 'external'
    teamMember?: {
      _id: string
      name: string
    }
    principalInvestigator?: {
      _id: string
      name: string
    }
    externalName?: string
    isCorresponding?: boolean
  }>
  journal: string
  year: number
  area: 'lps' | 'peptidoglycan' | 'screening'
  abstract?: string
  doi?: string
  featured?: boolean
  publishedAt?: string
}

export interface ResearchArea {
  _id: string
  title: string
  slug: { current: string }
  subtitle?: string
  description?: string
  detailedDescription?: string
  image?: any
  methods?: string[]
  currentProjects?: Array<{
    title: string
    description: string
    status: 'Planning' | 'Active' | 'Completed'
  }>
  keyFindings?: string[]
  order?: number
}

export interface ContactInfo {
  _id: string
  title: string
  headerTitle?: string
  headerSubtitle?: string
  labName?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  email?: string
  phone?: string
  googleMapsEmbed?: string
  researchOpportunities?: {
    title: string
    description: string
  }
  officeHours?: string
}

export interface HeroSection {
  _id: string
  page: 'main' | 'research' | 'people'
  backgroundImage?: any
  tagline?: string
  title?: {
    line1?: string
    line2?: string
    line3?: string
  }
  subtitle?: string
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
  showScrollIndicator?: boolean
}

export interface PrincipalInvestigator {
  _id: string
  name: string
  title: string
  department: string
  institution: string
  image?: any
  researchExpertise?: string
  education?: Array<{
    degree: string
    institution: string
    period?: string
  }>
  honors?: string[]
  email?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  officeHours?: string
  showPublications?: boolean
  publicationSettings?: {
    maxPublications: number
    yearsLimit: number
  }
  publicationCount?: number
}
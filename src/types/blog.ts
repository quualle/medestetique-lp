export type TreatmentType = 'botox' | 'hyaluron' | 'prp' | 'mesotherapie' | 'andere'
export type AgeGroup = '18-35' | '35-55' | '55+'
export type ApplicationType = 'medical' | 'cosmetic' | 'both'
export type GenderFocus = 'women' | 'men' | 'both'
export type TreatmentArea = 'face' | 'body' | 'face_and_body'
export type ContentIntent = 'education' | 'myth_busting' | 'comparison' | 'how_to'

export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_at: string | null
  created_at: string
  updated_at: string
  status: 'draft' | 'published'
  featured_image?: string
  
  // Beauty-specific fields
  treatment_type: TreatmentType
  target_age_group: AgeGroup
  application_type: ApplicationType
  gender_focus: GenderFocus
  treatment_area: TreatmentArea
  content_intent: ContentIntent
  
  // SEO
  meta_title?: string
  meta_description?: string
  keywords?: string[]
}

export interface BlogFilters {
  treatment_type?: TreatmentType
  target_age_group?: AgeGroup
  application_type?: ApplicationType
  gender_focus?: GenderFocus
  treatment_area?: TreatmentArea
  content_intent?: ContentIntent
  status?: 'draft' | 'published'
}
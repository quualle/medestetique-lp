import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../src/lib/supabase/marketing'
import { BlogFilters } from '../../../../src/types/blog'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filters: BlogFilters = {
      treatment_type: searchParams.get('treatment_type') as any || undefined,
      target_age_group: searchParams.get('target_age_group') as any || undefined,
      application_type: searchParams.get('application_type') as any || undefined,
      gender_focus: searchParams.get('gender_focus') as any || undefined,
      treatment_area: searchParams.get('treatment_area') as any || undefined,
      content_intent: searchParams.get('content_intent') as any || undefined,
    }

    let query = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = query.eq(key, value)
      }
    })

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
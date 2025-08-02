import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../src/lib/supabase/marketing'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', params.slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
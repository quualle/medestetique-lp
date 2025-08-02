import { NextResponse } from 'next/server'
import { supabase } from '../../src/lib/supabase/marketing'

export async function GET() {
  try {
    // Get all published articles
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })

    const baseUrl = 'https://medestetique.de'
    
    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/impressum', priority: '0.3', changefreq: 'yearly' },
      { url: '/datenschutz', priority: '0.3', changefreq: 'yearly' },
    ]

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n'
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
      xml += '  </url>\n'
    })

    // Add blog articles
    if (articles) {
      articles.forEach(article => {
        xml += '  <url>\n'
        xml += `    <loc>${baseUrl}/blog/${article.slug}</loc>\n`
        xml += '    <changefreq>monthly</changefreq>\n'
        xml += '    <priority>0.7</priority>\n'
        xml += `    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>\n`
        xml += '  </url>\n'
      })
    }

    xml += '</urlset>'

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
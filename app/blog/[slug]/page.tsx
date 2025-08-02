import React from 'react'
import { notFound } from 'next/navigation'
import BlogArticle from '../../../components/BlogArticle'
import { supabase } from '../../../src/lib/supabase/marketing'
import { BlogArticle as BlogArticleType } from '../../../src/types/blog'

export async function generateStaticParams() {
  const { data } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published')

  return (data || []).map((article) => ({
    slug: article.slug,
  }))
}

async function getArticle(slug: string): Promise<BlogArticleType | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function getRelatedArticles(currentId: string, treatmentType: string): Promise<BlogArticleType[]> {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('treatment_type', treatmentType)
    .neq('id', currentId)
    .limit(3)
    .order('published_at', { ascending: false })

  return data || []
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Artikel nicht gefunden | Medestetique',
      description: 'Der gesuchte Artikel konnte nicht gefunden werden.',
    }
  }

  return {
    title: article.meta_title || `${article.title} | Medestetique`,
    description: article.meta_description || article.excerpt,
    keywords: article.keywords?.join(', '),
  }
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, article.treatment_type)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <BlogArticle article={article} relatedArticles={relatedArticles} />
    </div>
  )
}
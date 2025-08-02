'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { BlogArticle as BlogArticleType, TreatmentType, AgeGroup } from '../src/types/blog'

const treatmentTypeLabels: Record<TreatmentType, string> = {
  botox: 'Botox',
  hyaluron: 'Hyaluron',
  prp: 'PRP',
  mesotherapie: 'Mesotherapie',
  andere: 'Andere'
}

const ageGroupLabels: Record<AgeGroup, string> = {
  '18-35': '18-35 Jahre',
  '35-55': '35-55 Jahre',
  '55+': '55+ Jahre'
}

interface Props {
  article: BlogArticleType
  relatedArticles: BlogArticleType[]
}

export default function BlogArticle({ article, relatedArticles }: Props) {
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const getApplicationBadge = (type: string) => {
    switch (type) {
      case 'medical':
        return <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Medizinisch</span>
      case 'cosmetic':
        return <span className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded">Kosmetisch</span>
      case 'both':
        return <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">Med. & Kosm.</span>
      default:
        return null
    }
  }

  // Convert markdown to HTML
  const [htmlContent, setHtmlContent] = useState('')
  
  React.useEffect(() => {
    const convertMarkdown = async () => {
      const html = await marked(article.content)
      setHtmlContent(DOMPurify.sanitize(html))
    }
    convertMarkdown()
  }, [article.content])

  return (
    <article className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded">
            {treatmentTypeLabels[article.treatment_type]}
          </span>
          {getApplicationBadge(article.application_type)}
          <span className="text-gray-500 text-sm">
            {ageGroupLabels[article.target_age_group]}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div>
            <span className="font-medium">{article.author}</span>
            <span className="mx-2">•</span>
            <time>{new Date(article.published_at || article.created_at).toLocaleDateString('de-DE')}</time>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {showCopySuccess ? 'Kopiert!' : 'Link kopieren'}
          </button>
        </div>
      </header>

      {/* Featured Image */}
      {article.featured_image && (
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      {/* Trust Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <img
            src="/images/saskia.png"
            alt="Dr. med. Saskia Heer"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Dr. med. Saskia Heer</h3>
            <p className="text-sm text-gray-600 mb-2">Fachärztin für Ästhetische Medizin</p>
            <p className="text-sm text-gray-600">
              Mitglied der Ärztekammer Brandenburg und Bayern • 
              Spezialisiert auf minimalinvasive ästhetische Behandlungen
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-rose max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Weitere Artikel zu {treatmentTypeLabels[article.treatment_type]}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <article key={related.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {related.featured_image && (
                  <img
                    src={related.featured_image}
                    alt={related.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">
                    <Link href={`/blog/${related.slug}`} className="hover:text-rose-600 transition-colors">
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
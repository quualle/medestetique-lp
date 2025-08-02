'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlogArticle, TreatmentType, AgeGroup } from '../src/types/blog'

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

export default function BlogOverview() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | ''>('')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | ''>('')

  useEffect(() => {
    fetchArticles()
  }, [selectedTreatment, selectedAgeGroup])

  const fetchArticles = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedTreatment) params.append('treatment_type', selectedTreatment)
      if (selectedAgeGroup) params.append('target_age_group', selectedAgeGroup)
      
      const response = await fetch(`/api/blog/articles?${params}`)
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const getApplicationBadge = (type: string) => {
    switch (type) {
      case 'medical':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Medizinisch</span>
      case 'cosmetic':
        return <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Kosmetisch</span>
      case 'both':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Med. & Kosm.</span>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Behandlungsart
            </label>
            <select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value as TreatmentType | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Alle Behandlungen</option>
              {Object.entries(treatmentTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altersgruppe
            </label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Alle Altersgruppen</option>
              {Object.entries(ageGroupLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {article.featured_image && (
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                  {treatmentTypeLabels[article.treatment_type]}
                </span>
                {getApplicationBadge(article.application_type)}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                <Link href={`/blog/${article.slug}`} className="hover:text-rose-600 transition-colors">
                  {article.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{ageGroupLabels[article.target_age_group]}</span>
                <span>{new Date(article.published_at || article.created_at).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Keine Artikel gefunden. Passen Sie Ihre Filter an.</p>
        </div>
      )}
    </div>
  )
}
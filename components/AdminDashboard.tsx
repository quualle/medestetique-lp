'use client'

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { BlogArticle, TreatmentType, AgeGroup, ApplicationType } from '../src/types/blog'

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

const applicationTypeLabels: Record<ApplicationType, string> = {
  medical: 'Medizinisch',
  cosmetic: 'Kosmetisch',
  both: 'Med. & Kosm.'
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [stats, setStats] = useState<Record<TreatmentType, number>>({
    botox: 0,
    hyaluron: 0,
    prp: 0,
    mesotherapie: 0,
    andere: 0
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const sessionToken = Cookies.get('admin_session')
      const response = await fetch('/api/blog/admin/articles', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
        calculateStats(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (articles: BlogArticle[]) => {
    const newStats: Record<TreatmentType, number> = {
      botox: 0,
      hyaluron: 0,
      prp: 0,
      mesotherapie: 0,
      andere: 0
    }

    articles.forEach(article => {
      if (article.status === 'published') {
        newStats[article.treatment_type]++
      }
    })

    setStats(newStats)
  }

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const sessionToken = Cookies.get('admin_session')
      const newStatus = currentStatus === 'published' ? 'draft' : 'published'
      
      const response = await fetch(`/api/blog/admin/articles/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchArticles() // Refresh the list
      }
    } catch (error) {
      console.error('Error updating article status:', error)
    }
  }

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true
    return article.status === filter
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(stats).map(([type, count]) => (
          <div key={type} className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {treatmentTypeLabels[type as TreatmentType]}
            </h3>
            <p className="text-2xl font-bold text-rose-600">{count}</p>
            <p className="text-xs text-gray-500">Veröffentlicht</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 font-medium transition-colors ${
              filter === 'all' 
                ? 'text-rose-600 border-b-2 border-rose-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Alle ({articles.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-6 py-3 font-medium transition-colors ${
              filter === 'published' 
                ? 'text-rose-600 border-b-2 border-rose-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Veröffentlicht ({articles.filter(a => a.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-6 py-3 font-medium transition-colors ${
              filter === 'draft' 
                ? 'text-rose-600 border-b-2 border-rose-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Entwürfe ({articles.filter(a => a.status === 'draft').length})
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Behandlung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Altersgruppe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {article.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800 px-2 py-1">
                      {treatmentTypeLabels[article.treatment_type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ageGroupLabels[article.target_age_group]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicationTypeLabels[article.application_type]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(article.created_at).toLocaleDateString('de-DE')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleStatusToggle(article.id, article.status)}
                      className="text-rose-600 hover:text-rose-900"
                    >
                      {article.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Keine Artikel gefunden.</p>
          </div>
        )}
      </div>
    </div>
  )
}
import React from 'react'
import BlogOverview from '../../components/BlogOverview'

export const metadata = {
  title: 'Blog | Medestetique - Expertenwissen zu ästhetischer Medizin',
  description: 'Erfahren Sie alles über Botox, Hyaluron, PRP und weitere Behandlungen. Professionelle Aufklärung von Dr. med. Saskia Heer.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Expertenwissen aus der ästhetischen Medizin
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Informieren Sie sich über die neuesten Behandlungsmethoden, räumen Sie mit Mythen auf 
            und erfahren Sie alles Wissenswerte rund um ästhetische Medizin - 
            verfasst von Dr. med. Saskia Heer.
          </p>
        </div>
        
        <BlogOverview />
      </div>
    </div>
  )
}
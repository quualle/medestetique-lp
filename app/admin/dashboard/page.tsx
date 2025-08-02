'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminDashboard from '../../../components/AdminDashboard'

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const sessionToken = Cookies.get('admin_session')
    const expectedToken = process.env.NEXT_PUBLIC_ADMIN_SESSION_TOKEN

    if (!sessionToken) {
      router.push('/admin/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              Cookies.remove('admin_session')
              router.push('/admin/login')
            }}
            className="text-rose-600 hover:text-rose-700 transition-colors"
          >
            Abmelden
          </button>
        </header>
        
        <AdminDashboard />
      </div>
    </div>
  )
}
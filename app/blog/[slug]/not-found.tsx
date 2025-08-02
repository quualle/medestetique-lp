import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-rose-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Artikel nicht gefunden
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Der gesuchte Artikel konnte leider nicht gefunden werden. 
          Möglicherweise wurde er verschoben oder existiert nicht mehr.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Zurück zum Blog
        </Link>
      </div>
    </div>
  )
}
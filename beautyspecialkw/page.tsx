import SummerSpecialLanding from './SummerSpecialLanding';

export const metadata = {
  title: 'Summer Special Königs Wusterhausen | Faltenbehandlung ab 179€',
  description: 'Limitierte Sommer-Aktion: Professionelle Faltenbehandlung in KW ✓ Ab 179€ ✓ Erfahrene Ärztin ✓ MwSt-frei ✓ Kostenlose Nachbehandlung',
  keywords: 'Faltenbehandlung Königs Wusterhausen, Anti-Aging KW, Hyaluron, PRP, Ästhetische Medizin',
  openGraph: {
    title: 'Summer Special - Faltenbehandlung in Königs Wusterhausen',
    description: 'Nutzen Sie unsere limitierte Sommer-Aktion für strahlend schöne Haut. Professionelle Behandlung zum Aktionspreis.',
    url: 'https://beautyspecialkw.de/',
    siteName: 'Beauty Special KW',
    locale: 'de_DE',
    type: 'website',
    images: [{
      url: '/images/summer-beauty.jpg',
      width: 1200,
      height: 630,
      alt: 'Sommer Beauty Special in Königs Wusterhausen'
    }]
  },
  alternates: {
    canonical: 'https://beautyspecialkw.de/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function SummerSpecialPage() {
  return <SummerSpecialLanding />;
}
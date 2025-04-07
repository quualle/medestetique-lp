import './globals.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';

// More refined font configuration with weight variants
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'MedEstetique | Saskia Heer | Premium Schönheitsbehandlungen',
  description: 'Exklusive ästhetische Behandlungen mit Botox, Hyaluronsäure und PRP von Saskia Heer in erstklassiger Qualität für Ihre natürliche Schönheit.',
  keywords: 'Botox, Hyaluronsäure, PRP, ästhetische Behandlungen, Faltenbehandlung, Schönheitsbehandlung, Premium',
  authors: [{ name: 'Saskia Heer' }],
  openGraph: {
    title: 'MedEstetique | Saskia Heer | Premium Schönheitsbehandlungen',
    description: 'Exklusive ästhetische Behandlungen mit Botox, Hyaluronsäure und PRP von Saskia Heer in erstklassiger Qualität.',
    images: ['/images/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${montserrat.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <body className="bg-light text-primary antialiased selection:bg-secondary/20 selection:text-primary">{children}</body>
    </html>
  );
}

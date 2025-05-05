import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Quicksand } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { StickyQuoteButton } from '@/components/sticky-quote-button';
import { ModalProvider } from '@/components/modal-context';
import { ModalContainer } from '@/components/modal-container';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Blue Landscaping Services',
    default: 'Blue Landscaping Services | Professional Landscaping & Hardscaping in Seattle',
  },
  description: 'Blue Landscaping Services offers professional landscaping, hardscaping, irrigation, and lawn care services in Seattle and surrounding areas. Get a free quote today!',
  keywords: 'landscaping, hardscaping, irrigation, lawn care, seattle, washington, garden design, patio installation',
  metadataBase: new URL('https://bluelandscaping.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bluelandscaping.com',
    siteName: 'Blue Landscaping Services',
    title: 'Blue Landscaping Services | Professional Landscaping & Hardscaping in Seattle',
    description: 'Professional landscaping and hardscaping services in Seattle and surrounding areas. Get a free quote today!',
    images: [
      {
        url: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
        width: 1200,
        height: 630,
        alt: 'Blue Landscaping Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Landscaping Services | Professional Landscaping & Hardscaping in Seattle',
    description: 'Professional landscaping and hardscaping services in Seattle and surrounding areas. Get a free quote today!',
    images: ['https://images.pexels.com/photos/589/garden-green-grass-spring.jpg'],
    creator: '@bluelandscaping',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${quicksand.variable}`}>
      <body className="relative min-h-screen flex flex-col">
        <ModalProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <StickyQuoteButton />
          <Footer />
          <ModalContainer />
        </ModalProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aadeshgulumbe.live'),
  title: {
    default: 'Aadesh Gulumbe - Full Stack Developer | React, Node.js, TypeScript Expert',
    template: '%s | Aadesh Gulumbe - Full Stack Developer'
  },
  description: 'Aadesh Gulumbe is a passionate Full Stack Developer specializing in React.js, Node.js, TypeScript, and modern web technologies. Available for freelance projects and full-time opportunities in Pune, India.',
  keywords: [
    'Aadesh Gulumbe',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer', 
    'TypeScript Developer',
    'JavaScript Developer',
    'Web Developer Pune',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'Freelance Developer Pune',
    'Portfolio',
    'Pune Developer',
    'India Developer',
    'Next.js Developer',
    'MongoDB Developer',
    'Express.js Developer',
    'React Native Developer',
    'API Development',
    'Database Design',
    'UI/UX Developer',
    'Full Stack Engineer India',
    'Web Development Services Pune'
  ],
  authors: [{ name: 'Aadesh Gulumbe', url: 'https://aadeshgulumbe.vercel.app' }],
  creator: 'Aadesh Gulumbe',
  publisher: 'Aadesh Gulumbe',
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aadeshgulumbe.live',
    siteName: 'Aadesh Gulumbe - Full Stack Developer',
    title: 'Aadesh Gulumbe - Full Stack Developer | React, Node.js, TypeScript Expert',
    description: 'Passionate Full Stack Developer specializing in React.js, Node.js, TypeScript, and modern web technologies. Available for freelance projects and full-time opportunities in Pune, India.',
    images: [
      {
        url: '/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Aadesh Gulumbe - Full Stack Developer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadesh Gulumbe - Full Stack Developer',
    description: 'Passionate Full Stack Developer specializing in React.js, Node.js, TypeScript, and modern web technologies.',
    images: ['/profile.jpeg'],
    creator: '@aadesh0706',
    site: '@aadesh0706',
  },
  alternates: {
    canonical: 'https://aadeshgulumbe.live',
  },
  category: 'technology',
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aadesh Gulumbe',
  alternateName: ['Aadesh', 'Aadesh G'],
  description: 'Full Stack Developer specializing in React.js, Node.js, TypeScript, and modern web technologies',
  url: 'https://aadeshgulumbe.live',
  image: 'https://aadeshgulumbe.live/profile.jpeg',
  sameAs: [
    'https://github.com/aadesh0706',
    'https://linkedin.com/in/aadeshgulumbe',
    'https://twitter.com/aadesh0706'
  ],
  jobTitle: 'Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance'
  },
  knowsAbout: [
    'React.js', 'Node.js', 'TypeScript', 'JavaScript', 'Next.js',
    'MongoDB', 'Express.js', 'PostgreSQL', 'GraphQL', 'REST APIs',
    'Web Development', 'Frontend Development', 'Backend Development'
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'India'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional',
    email: 'aadeshgulumbe3@gmail.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Essential Meta Tags */}
        <link rel="canonical" href="https://aadeshgulumbe.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="Aadesh Gulumbe" />
        <meta name="copyright" content="Aadesh Gulumbe" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        
        {/* Business Info */}
        <meta name="contact" content="aadeshgulumbe@example.com" />
        <meta name="reply-to" content="aadeshgulumbe@example.com" />
        <meta name="owner" content="Aadesh Gulumbe" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        <Script
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </body>
    </html>
  );
}

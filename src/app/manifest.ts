export default function manifest() {
  return {
    name: 'Aadesh Gulumbe - Full Stack Developer Portfolio',
    short_name: 'Aadesh Gulumbe',
    description: 'Professional portfolio of Aadesh Gulumbe, Full Stack Developer specializing in React.js, Node.js, and TypeScript',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    categories: ['business', 'productivity', 'portfolio'],
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '375x812',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  }
}

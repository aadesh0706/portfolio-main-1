// Essential favicon files - place in public folder

// 1. favicon.ico (32x32)
// 2. apple-touch-icon.png (180x180) 
// 3. favicon-16x16.png (16x16)
// 4. favicon-32x32.png (32x32)
// 5. android-chrome-192x192.png (192x192)
// 6. android-chrome-512x512.png (512x512)

// You can generate these from your profile image using:
// https://realfavicongenerator.net/

// For now, let's create a simple favicon using text
export const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" fill="url(#grad)" rx="6"/>
  <text x="16" y="20" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">A</text>
</svg>
`;

// README for SEO Optimization
export const seoChecklist = [
  'Meta titles optimized with target keywords',
  'Meta descriptions under 160 characters',
  'Schema.org structured data implemented',
  'Open Graph tags for social sharing',
  'Twitter Card meta tags',
  'Canonical URLs set',
  'Sitemap.xml generated',
  'Robots.txt configured',
  'PWA manifest added',
  'Semantic HTML structure',
  'Alt texts for all images',
  'Fast loading performance',
  'Mobile responsive design',
  'HTTPS enabled',
  'Google Analytics integration ready'
];

export const keywordStrategy = {
  primary: 'Aadesh Gulumbe',
  secondary: [
    'Full Stack Developer',
    'React Developer Mumbai',
    'Node.js Developer India',
    'TypeScript Expert',
    'Freelance Web Developer',
    'JavaScript Programmer',
    'Frontend Developer Mumbai',
    'Backend Developer India',
    'Web Development Services',
    'Portfolio Website'
  ],
  longtail: [
    'Aadesh Gulumbe full stack developer',
    'Hire React developer Mumbai',
    'Professional web developer India',
    'Experienced TypeScript developer',
    'Freelance JavaScript programmer',
    'Full stack engineer portfolio',
    'Web application developer Mumbai',
    'React Node.js developer India'
  ]
};

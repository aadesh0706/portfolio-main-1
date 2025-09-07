# Aadesh Gulumbe - Portfolio Website

This is a modern, responsive personal portfolio website built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Features

- ✅ **Hero section** with name, tagline, and call-to-action buttons
- ✅ **About Me section** with personal bio
- ✅ **Projects section** that dynamically fetches GitHub repositories
- ✅ **Contact section** with email and contact form
- ✅ **Dark mode toggle** with system preference detection
- ✅ **Responsive design** for all screen sizes
- ✅ **Smooth animations** using Framer Motion
- ✅ **Modern UI** with TailwindCSS styling

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **GitHub API** - Dynamic project fetching

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main portfolio page
```

## Customization

To customize this portfolio for your own use:

1. **Update personal information** in `src/app/page.tsx`:
   - Change name from "Aadesh Gulumbe"
   - Update tagline
   - Replace GitHub username in API calls
   - Update LinkedIn and GitHub profile links
   - Replace email address

2. **Modify the About section** with your own bio

3. **Update contact information** in the contact section

## Features in Detail

### Dynamic GitHub Integration
- Automatically fetches your latest repositories
- Filters out profile and GitHub Pages repos
- Sorts by last updated date
- Shows top 6 projects
- Displays repo name, description, stars, and programming language

### Dark Mode
- Respects system preferences
- Remembers user choice in localStorage
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

### Performance
- Optimized with Next.js App Router
- Lazy loading and efficient animations
- Minimal bundle size

## Deployment

This project can be easily deployed on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Any hosting provider that supports Node.js**

For Vercel deployment:
```bash
npm run build
```

## License

This project is open source and available under the [MIT License](LICENSE).

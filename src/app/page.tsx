'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, ExternalLink, Star, Code, MapPin, Phone, Calendar, Award, Briefcase, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
  pushed_at: string;
  forks_count: number;
  topics: string[];
  homepage: string | null;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // SEO-optimized structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://aadeshgulumbe.vercel.app/#webpage',
        url: 'https://aadeshgulumbe.vercel.app/',
        name: 'Aadesh Gulumbe - Full Stack Developer Portfolio',
        isPartOf: { '@id': 'https://aadeshgulumbe.vercel.app/#website' },
        primaryImageOfPage: { '@id': 'https://aadeshgulumbe.vercel.app/profile.jpeg' },
        datePublished: '2025-09-07T00:00:00+00:00',
        dateModified: '2025-09-07T00:00:00+00:00',
        description: 'Professional portfolio of Aadesh Gulumbe, showcasing full stack web development projects, skills, and experience in React, Node.js, and TypeScript.'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aadeshgulumbe.vercel.app/#website',
        url: 'https://aadeshgulumbe.vercel.app/',
        name: 'Aadesh Gulumbe Portfolio',
        description: 'Full Stack Developer Portfolio',
        publisher: { '@id': 'https://aadeshgulumbe.vercel.app/#person' },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://aadeshgulumbe.vercel.app/#person',
        name: 'Aadesh Gulumbe',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://aadeshgulumbe.vercel.app/profile.jpeg',
          url: 'https://aadeshgulumbe.vercel.app/profile.jpeg',
          caption: 'Aadesh Gulumbe - Full Stack Developer'
        },
        description: 'Experienced Full Stack Developer specializing in React.js, Node.js, TypeScript, and modern web technologies',
        sameAs: [
          'https://github.com/aadesh0706',
          'https://linkedin.com/in/aadeshgulumbe'
        ]
      }
    ]
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Professional Skills Data
  const skills: Skill[] = [
    { name: "JavaScript", level: 90, category: "Frontend" },
    { name: "React.js", level: 85, category: "Frontend" },
    { name: "Next.js", level: 80, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "IoT Development", level: 75, category: "Embedded" },
    { name: "Arduino/ESP32", level: 85, category: "Embedded" },
    { name: "Database Design", level: 70, category: "Backend" },
    { name: "Cloud Services", level: 65, category: "DevOps" }
  ];

  // Experience Data
  const experiences: Experience[] = [
    {
      title: "Full Stack Developer",
      company: "Tech Innovation Hub",
      period: "2023 - Present",
      description: [
        "Developed responsive web applications using React.js and Next.js",
        "Implemented IoT solutions for smart home automation systems",
        "Collaborated with cross-functional teams to deliver high-quality products",
        "Optimized application performance resulting in 40% faster load times"
      ],
      technologies: ["React", "Next.js", "Node.js", "IoT", "MongoDB"]
    },
    {
      title: "IoT Developer",
      company: "Smart Solutions Ltd",
      period: "2022 - 2023",
      description: [
        "Designed and developed IoT devices using Arduino and ESP32",
        "Created web dashboards for device monitoring and control",
        "Integrated cloud services for real-time data processing",
        "Reduced power consumption of devices by 30% through optimization"
      ],
      technologies: ["Arduino", "ESP32", "Python", "AWS IoT", "React"]
    }
  ];

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/aadesh0706/repos?sort=updated&per_page=100');
      const data = await response.json();
      
      // Filter out profile repos and GitHub Pages
      const filteredRepos = data.filter((repo: Repository) => 
        !repo.name.includes('.github.io') && 
        repo.name !== 'aadesh0706' && 
        !repo.name.toLowerCase().includes('config')
      );
      
      // Sort by stars first (descending), then by last updated
      const sortedByStars = filteredRepos
        .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count);
      
      const sortedByDate = filteredRepos
        .sort((a: Repository, b: Repository) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      
      // Get top 3 most starred repos
      const topStarred = sortedByStars.slice(0, 3);
      
      // Get top 3 latest repos (excluding already selected starred repos)
      const latestRepos = sortedByDate
        .filter((repo: Repository) => !topStarred.find((starred: Repository) => starred.id === repo.id))
        .slice(0, 3);
      
      // Combine: first 3 most starred, then 3 latest
      const finalRepos = [...topStarred, ...latestRepos];
      
      setRepos(finalRepos);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectImage = (repoName: string) => {
    // Create a more meaningful image based on the repository type
    const imageMap: { [key: string]: number } = {
      'web': 1060,
      'react': 1040, 
      'javascript': 1020,
      'node': 1000,
      'python': 980,
      'iot': 960,
      'arduino': 940,
      'esp32': 920,
      'dashboard': 900,
      'api': 880,
      'mobile': 860,
      'frontend': 840,
      'backend': 820,
      'fullstack': 800
    };

    // Check repo name for keywords and assign appropriate image
    const lowerName = repoName.toLowerCase();
    let imageId = 1100; // default

    for (const [keyword, id] of Object.entries(imageMap)) {
      if (lowerName.includes(keyword)) {
        imageId = id;
        break;
      }
    }

    // If no keyword match, use hash of repo name for consistency
    if (imageId === 1100) {
      imageId = 1000 + (Math.abs(repoName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0)) % 100);
    }

    return `https://picsum.photos/400/250?random=${imageId}`;
  };

  const handleProjectClick = (repo: Repository) => {
    if (repo.homepage) {
      window.open(repo.homepage, '_blank');
    } else {
      window.open(repo.html_url, '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here - you can integrate with a service like EmailJS or similar
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg z-50 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Aadesh Gulumbe</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Full Stack Developer</p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a
                href="#skills"
                whileHover={{ scale: 1.05 }}
                className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              
              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Hire Me
              </motion.a>
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-600" />}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-slate-600" />}
              </motion.button>
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="px-4 py-6 space-y-4">
            <motion.a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>About Me</span>
              </div>
            </motion.a>
            <motion.a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Experience</span>
              </div>
            </motion.a>
            <motion.a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Skills</span>
              </div>
            </motion.a>
            <motion.a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span>Projects</span>
              </div>
            </motion.a>
            <motion.a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span>Contact</span>
              </div>
            </motion.a>
            
            {/* Mobile CTA */}
            <motion.a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-center shadow-lg"
            >
              Hire Me Now
            </motion.a>

            {/* Mobile Social Links */}
            <div className="flex justify-center space-x-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <motion.a
                href="https://github.com/aadesh0706"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <Github size={20} className="text-slate-600 dark:text-slate-300" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/aadeshgulumbe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <Linkedin size={20} className="text-blue-600" />
              </motion.a>
              <motion.a
                href="mailto:aadeshgulumbe3@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <Mail size={20} className="text-green-600" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section - SEO Optimized */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" itemScope itemType="https://schema.org/Person">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Profile Section */}
            <motion.div
              variants={itemVariants}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4"
                  itemProp="name"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Aadesh Gulumbe
                  </span>
                </motion.h1>
                
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 text-lg text-slate-600 dark:text-slate-300 mb-4"
                >
                  <Code className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold" itemProp="jobTitle">Full Stack Developer | React.js Expert | Node.js Specialist</span>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-6"
                >
                  <MapPin className="w-4 h-4" />
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">Pune</span>, <span itemProp="addressCountry">India</span>
                  </span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4" />
                  <span>Available for hiring</span>
                </motion.div>
                
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8"
                  itemProp="description"
                >
                  Experienced <strong>Full Stack Developer</strong> specializing in <strong>React.js</strong>, <strong>Node.js</strong>, 
                  <strong>TypeScript</strong>, and modern web technologies. I build scalable, high-performance web applications 
                  and deliver exceptional user experiences. Available for <strong>freelance projects</strong> and 
                  <strong>full-time opportunities</strong> in Pune, India.
                </motion.p>
              </div>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hire Me</span>
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View Portfolio</span>
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex space-x-4"
              >
                <motion.a
                  href="https://github.com/aadesh0706"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <Github size={24} className="text-slate-900 dark:text-white" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/aadeshgulumbe"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <Linkedin size={24} className="text-blue-600" />
                </motion.a>
                <motion.a
                  href="mailto:aadeshgulumbe3@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <Mail size={24} className="text-green-600" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative w-80 h-80 lg:w-96 lg:h-96"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl rotate-6"></div>
                  <div className="relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                    <Image
                      src="/profile.jpeg"
                      alt="Aadesh Gulumbe - Professional Profile"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </motion.div>
                
                {/* Floating Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Award className="w-6 h-6" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Code className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-6">
                  I'm a passionate Software Developer with a unique blend of expertise in IoT and Web Technologies. 
                  My journey began with a fascination for how hardware and software can work together to create 
                  innovative solutions that make a real difference in people's lives.
                </p>
                <p className="mb-6">
                  With over 3+ years of experience in modern web development and embedded systems, I specialize 
                  in building scalable applications that bridge the gap between the physical and digital worlds. 
                  I'm particularly passionate about creating user-centric solutions that are both technically 
                  robust and aesthetically pleasing.
                </p>
                <p>
                  I believe in continuous learning and staying at the forefront of technology. When I'm not 
                  coding, you can find me exploring the latest IoT innovations, contributing to open-source 
                  projects, or mentoring aspiring developers in the community.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">3+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">20+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">IoT & Web Specialist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">Open Source Contributor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Professional Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              My professional journey in software development and IoT innovation
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{exp.title}</h3>
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Technical Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Frontend', 'Backend', 'Embedded', 'DevOps'].map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore my latest projects showcasing innovative solutions in web development and IoT. 
              Click on any project to view it live or explore the code.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(repo)}
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                      <Image
                        src={getProjectImage(repo.name)}
                        alt={`${repo.name} project preview`}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to a gradient background if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ExternalLink size={16} className="text-slate-700 dark:text-slate-300" />
                      </div>
                      {/* Fallback content when image fails */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Code className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            {repo.language || 'Project'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {repo.name.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </h3>
                        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                          <Star size={16} />
                          <span className="text-sm font-medium">{repo.stargazers_count}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {repo.description || 'An innovative project showcasing modern development practices and cutting-edge technologies.'}
                      </p>
                      
                      {/* Tech Stack & Stats */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          {repo.language && (
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                              {repo.language}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs">{repo.forks_count}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          Updated {new Date(repo.pushed_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Topics/Tags */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics.slice(0, 3).map((topic, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(repo);
                          }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <span>View Project</span>
                          <ExternalLink size={14} />
                        </motion.button>
                        <motion.a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                        >
                          <Github size={16} className="text-slate-700 dark:text-slate-300" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/aadesh0706"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Github size={20} />
              <span>View All Projects on GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to discuss new projects, 
              creative ideas, or opportunities to be part of your vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="mb-8 text-blue-100">
                  I'm currently available for freelance opportunities. 
                  Whether you have a project in mind or just want to chat about technology, 
                  I'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <motion.a
                    href="mailto:aadeshgulumbe3@gmail.com"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center space-x-4 text-white hover:text-blue-100 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-100 text-sm">aadeshgulumbe3@gmail.com</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+919923608616"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center space-x-4 text-white hover:text-blue-100 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-blue-100 text-sm">+91 98765 43210</p>
                    </div>
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center space-x-4 text-white transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-blue-100 text-sm">India (Remote Available)</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-blue-100 mb-4">Follow me on social media</p>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://linkedin.com/in/aadeshgulumbe"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Linkedin size={18} />
                    </motion.a>
                    <motion.a
                      href="https://github.com/aadesh0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Send Message</span>
                </motion.button>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  I'll get back to you within 24 hours. Let's create something amazing together!
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-white text-lg font-bold mb-4">Aadesh Gulumbe</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Software Developer specializing in IoT and Web Technologies. 
                Passionate about creating innovative solutions that make a difference.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/aadesh0706" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/aadeshgulumbe" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:aadeshgulumbe3@gmail.com" 
                   className="text-slate-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-white transition-colors">About</a>
                <a href="#experience" className="block text-slate-400 hover:text-white transition-colors">Experience</a>
                <a href="#skills" className="block text-slate-400 hover:text-white transition-colors">Skills</a>
                <a href="#projects" className="block text-slate-400 hover:text-white transition-colors">Projects</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <p>Available for freelance</p>
                <p>Remote work friendly</p>
                <p>India timezone</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2025 Aadesh Gulumbe. Crafted with ❤️ using Next.js, TailwindCSS & Framer Motion.
              </p>
              <p className="text-slate-500 text-sm mt-2 md:mt-0">
                Designed to impress • Built to perform
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

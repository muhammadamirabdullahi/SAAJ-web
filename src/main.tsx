import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';
import { 
  Leaf, Menu, X, ArrowRight, Fish, Sprout, Bug, MapPin, Phone, Mail, 
  Instagram, Facebook, Twitter, Droplets, Recycle, ChevronRight, 
  BarChart3, PieChart as PieIcon, TrendingUp, ShieldCheck, Award, 
  Users, Clock, Play, Search, Filter, ExternalLink, Globe, Zap,
  CheckCircle2, FileText, MessageSquare, Briefcase, GraduationCap,
  Sun, Moon, Monitor, Share2, MessageCircle, ArrowLeft, ArrowUp
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Page = 'home' | 'dashboard' | 'gallery' | 'about' | 'services' | 'team' | 'blog' | 'contact' | 'testimonials' | string;
type ThemeMode = 'light' | 'dark' | 'system';

// --- Data ---

const BLOG_POSTS = [
  { 
    id: '1', 
    title: 'The Economics of BSF in Commercial Aquaculture', 
    date: 'Feb 15, 2026', 
    author: 'Dr. Sadiq Abubakar', 
    category: 'BSF Production', 
    excerpt: 'Analyzing the 40% reduction in feed costs through integrated Black Soldier Fly protein production systems.', 
    image: 'https://images.unsplash.com/photo-1594761053847-d5d401309c91?q=80&w=800',
    content: `
      <h2>The Rising Cost of Aquaculture</h2>
      <p>In the current global economic climate, commercial aquaculture faces a significant challenge: the skyrocketing cost of fishmeal. Traditional feed sources are becoming unsustainable both economically and environmentally.</p>
      
      <h3>Data-Driven Feed Optimization</h3>
      <p>We use a proprietary algorithm to calculate the optimal BSF-to-grain ratio for our fingerlings. Here is a snippet of our optimization logic:</p>
      
      <pre><code>
function calculateFeedRatio(fishWeight, waterTemp) {
  const baseRatio = 0.15; // 15% BSF protein
  const tempFactor = waterTemp > 28 ? 1.2 : 1.0;
  return (fishWeight * baseRatio * tempFactor).toFixed(2);
}
      </code></pre>
      
      <p>This precision ensures that we maintain a 40% reduction in total feed expenditure while improving immune responses.</p>
    `
  },
  { 
    id: '2', 
    title: 'Optimizing Yam Yields in Northern Nigeria', 
    date: 'Feb 10, 2026', 
    author: 'Engr. Musa Ibrahim', 
    category: 'Yam Production', 
    excerpt: 'How precision agriculture and organic soil enrichment are doubling metric tonnage per hectare.', 
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800',
    content: `
      <h2>The Potential of the Savannah</h2>
      <p>Niger State offers some of the best soil profiles for yam cultivation in West Africa. However, traditional methods often lead to soil depletion and declining yields over time. Saaj Farms is changing the narrative through precision soil management.</p>
      
      <h3>Organic Enrichment via BSF Frass</h3>
      <p>One of the key advantages of our integrated system is the production of "frass"—the byproduct of BSF larvae digestion. This material is a nutrient-dense organic fertilizer that restores soil microbial health far more effectively than synthetic alternatives.</p>
      
      <h3>Precision Planting Techniques</h3>
      <p>By utilizing GPS-mapped planting grids and moisture sensors, we ensure that every tuber has the optimal environment for growth. This has resulted in a 65% increase in "Grade A" export-quality tubers in our last harvest cycle.</p>
    `
  },
  { 
    id: '3', 
    title: 'Shariah-Compliant Agribusiness Models', 
    date: 'Feb 05, 2026', 
    author: 'Sadiq Abubakar', 
    category: 'Agribusiness Strategy', 
    excerpt: 'Building ethical, transparent, and profitable agricultural enterprises for the modern investor.', 
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800',
    content: `
      <h2>Ethics in Agriculture</h2>
      <p>At Saaj Farms, our operations are guided by more than just profit margins. We adhere to Shariah-compliant business principles, which emphasize transparency, risk-sharing, and the avoidance of exploitative practices.</p>
      
      <h3>Transparency as a Growth Driver</h3>
      <p>For investors, our commitment to ethical finance means clear reporting and operational honesty. We believe that by doing business the right way, we create long-term value that transcends simple quarterly gains.</p>
    `
  },
  { 
    id: '4', 
    title: 'Circular Farming: The Path to Zero Waste', 
    date: 'Jan 28, 2026', 
    author: 'Fatima Yusuf', 
    category: 'Sustainable Farming', 
    excerpt: 'A deep dive into the Saaj Farms integrated loop where every byproduct becomes a valuable input.', 
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800',
    content: `
      <h2>Closing the Loop</h2>
      <p>The traditional linear model of "take-make-waste" is obsolete. In modern agribusiness, waste is simply a resource in the wrong place. Our circular model ensures that nothing leaves our facility without providing value.</p>
    `
  },
  { 
    id: '5', 
    title: 'Scaling Aquaculture for National Food Security', 
    date: 'Jan 20, 2026', 
    author: 'Dr. Sadiq Abubakar', 
    category: 'Aquaculture', 
    excerpt: 'Addressing the protein gap in Nigeria through high-density, technology-driven catfish production.', 
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800',
    content: `
      <h2>The Protein Gap</h2>
      <p>Nigeria's growing population requires a massive increase in high-quality protein production. Aquaculture is the most efficient way to meet this demand, but it must be done at scale.</p>
    `
  }
];

const GALLERY_MEDIA = [
  { id: 1, type: 'image', category: 'Catfish Operations', src: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800', title: 'High-Density Pond System' },
  { id: 2, type: 'video', category: 'BSF Production', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://images.unsplash.com/photo-1594761053847-d5d401309c91?q=80&w=800', title: 'BSF Larvae Processing' },
  { id: 3, type: 'image', category: 'Yam Farms', src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800', title: 'Commercial Yam Plantation' },
  { id: 4, type: 'image', category: 'Training & Events', src: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800', title: 'Investor Site Visit' },
  { id: 5, type: 'video', category: 'Catfish Operations', src: 'https://www.w3schools.com/html/movie.mp4', poster: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800', title: 'Automated Feeding Cycle' },
  { id: 6, type: 'image', category: 'BSF Production', src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800', title: 'Organic Waste Conversion' },
];

const TEAM_MEMBERS = [
  { 
    name: 'Mohammed Sadiq Yinti', 
    role: 'General Manager', 
    bio: 'Business minded with nearly a decade of entrepreneurial experience. Co-founder and General Manager of FUBK Enterprise, and a strong advocate for sustainable national development in Nigeria since 2021.', 
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' 
  },
  { 
    name: 'Ahmad Adamu Gboyako', 
    role: 'Chief Operating Officer', 
    bio: 'Business-oriented with three years of entrepreneurial and political experience. Former Chairman, Students’ Representative Council. A strong believer in teamwork and passionate about youth participation in agriculture.', 
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400' 
  },
  { 
    name: 'Ahmad Shaba Gboyako', 
    role: 'Head of Consulting & International Partnership', 
    bio: 'A Business intern and medical student at Istinye University Turkey, bringing international perspective to our strategic partnerships.', 
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400' 
  },
  { 
    name: 'Ibrahim Mohammed A.', 
    role: 'IT Specialist', 
    bio: 'Managing our digital infrastructure and agri-tech integration systems.', 
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400' 
  },
  { 
    name: 'Mohammed Jibril', 
    role: 'Consultant/Farm Operator', 
    bio: 'Expert in day-to-day farm operations and technical consultancy.', 
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400' 
  },
  { 
    name: 'Jibril Ahmadu', 
    role: 'Farm Attendant', 
    bio: 'Dedicated to maintaining the highest standards of animal welfare and crop health.', 
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400' 
  },
  { 
    name: 'Rabiu Umar', 
    role: 'Security', 
    bio: 'Ensuring the safety and integrity of our farm operations and assets.', 
    img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400' 
  },
];

const DASHBOARD_DATA = {
  monthlyProduction: [
    { month: 'Jan', catfish: 45, yam: 12, bsf: 800 },
    { month: 'Feb', catfish: 52, yam: 15, bsf: 950 },
    { month: 'Mar', catfish: 48, yam: 18, bsf: 1100 },
    { month: 'Apr', catfish: 61, yam: 22, bsf: 1300 },
    { month: 'May', catfish: 55, yam: 25, bsf: 1250 },
    { month: 'Jun', catfish: 67, yam: 30, bsf: 1500 },
  ],
  revenueDistribution: [
    { name: 'Aquaculture', value: 45, color: '#1B4332' },
    { name: 'Crop Division', value: 35, color: '#2D6A4F' },
    { name: 'BSF Protein', value: 20, color: '#D4AF37' },
  ],
  metrics: [
    { label: 'Fish Survival Rate', val: '89', unit: '%', icon: <ShieldCheck /> },
    { label: 'Yam ROI', val: '98', unit: '%', icon: <TrendingUp /> },
    { label: 'BSF ROI', val: '93', unit: '%', icon: <Award /> },
    { label: 'Fish Profit Margin', val: '65.3', unit: '%', icon: <PieIcon /> },
    { label: 'Waste Processed', val: '1,800', unit: 'kg/cycle', icon: <Recycle /> }
  ]
};

// --- Components ---

const ThemeToggle = ({ theme, setTheme, compact = false }: { theme: ThemeMode, setTheme: (t: ThemeMode) => void, compact?: boolean }) => {
  const options: { mode: ThemeMode, icon: React.ReactNode, label: string }[] = [
    { mode: 'light', icon: <Sun size={compact ? 14 : 16} />, label: 'Light' },
    { mode: 'system', icon: <Monitor size={compact ? 14 : 16} />, label: 'System' },
    { mode: 'dark', icon: <Moon size={compact ? 14 : 16} />, label: 'Dark' },
  ];

  const activeIndex = options.findIndex(o => o.mode === theme);

  return (
    <div className={cn(
      "flex bg-primary/5 dark:bg-white/5 rounded-full p-1 border border-primary/10 dark:border-white/10 relative overflow-hidden",
      compact ? "w-[104px]" : "w-[128px]"
    )}>
      {/* Animated background pill */}
      <motion.div
        className="absolute bg-gold rounded-full shadow-md z-0"
        initial={false}
        animate={{
          x: activeIndex * (compact ? 32 : 40),
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        style={{
          width: compact ? '32px' : '40px',
          height: compact ? '32px' : '40px',
          top: '4px',
          left: '4px'
        }}
      />
      
      {options.map((opt) => (
        <button
          key={opt.mode}
          onClick={() => setTheme(opt.mode)}
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full transition-all duration-500",
            compact ? "w-8 h-8" : "w-10 h-10",
            theme === opt.mode ? "text-primary" : "text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white"
          )}
          title={`Switch to ${opt.label} mode`}
          aria-label={`Switch to ${opt.label} mode`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-8 md:mb-12">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4 block", light ? "text-accent" : "text-secondary")}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight", light ? "text-white" : "text-primary")}
    >
      {title}
    </motion.h2>
  </div>
);

const Navbar = ({ activePage, setPage, theme, setTheme }: { activePage: Page, setPage: (p: Page) => void, theme: ThemeMode, setTheme: (t: ThemeMode) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Services', id: 'services' },
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4",
      isScrolled || activePage !== 'home' ? "bg-surface/95 backdrop-blur-md shadow-lg py-3 border-b border-primary/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => setPage('home')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <Leaf className="text-accent w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={cn("text-xl font-serif font-black tracking-tight leading-none", (isScrolled || activePage !== 'home') ? "text-primary" : "text-white")}>SAAJ FARMS</span>
            <span className={cn("text-[8px] font-bold uppercase tracking-[0.3em]", (isScrolled || activePage !== 'home') ? "text-secondary" : "text-accent")}>Agribusiness Corp</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setPage(item.id)}
              className={cn(
                "text-[10px] font-extrabold uppercase tracking-widest transition-all hover:text-gold",
                activePage === item.id 
                  ? "text-gold underline decoration-2 underline-offset-8" 
                  : (isScrolled || activePage !== 'home' ? "text-primary/70" : "text-white/80")
              )}
            >
              {item.name}
            </button>
          ))}
          <div className="h-6 w-px bg-primary/10 mx-2" />
          <ThemeToggle theme={theme} setTheme={setTheme} compact />
          <button 
            onClick={() => setPage('contact')}
            className="bg-gold text-primary px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
          >
            Invest Now
          </button>
        </div>

        <button 
          className={cn("lg:hidden p-3 rounded-xl transition-colors", (isScrolled || activePage !== 'home') ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface shadow-2xl lg:hidden border-t border-primary/5"
          >
            <div className="flex flex-col p-8 gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => { setPage(item.id); setIsMobileMenuOpen(false); }}
                  className={cn(
                    "text-lg font-serif text-left",
                    activePage === item.id ? "text-gold" : "text-primary"
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-primary/5 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Switch Theme</span>
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Page Content Components ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="animate-in fade-in duration-1000">
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10" />
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="max-w-7xl mx-auto px-6 w-full z-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl space-y-6 md:space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white">Nigeria's Leading Integrated Agribusiness</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white leading-[1.1] md:leading-[0.9] tracking-tighter">
            Rooted in the Earth. <br/>
            <span className="text-gold italic">Growing for Tomorrow.</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 font-light max-w-xl leading-relaxed">
            SAAJ Farms is an agro-allied enterprise engaged in the cultivation, production, processing, and commercialization of Shariah-compliant agricultural products in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => setPage('services')} className="btn-premium w-full sm:w-auto">
              Our Value Chains
            </button>
            <button onClick={() => setPage('about')} className="btn-outline w-full sm:w-auto border-white text-white">
              About SAAJ Farms
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* About Preview */}
    <section className="section-padding bg-paper">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <SectionHeading title="Who We Are" subtitle="About Us" />
          <p className="text-primary/70 text-lg mb-8 font-light leading-relaxed">
            SAAJ Farms operates under SAAJ Multipurpose Limited, a duly registered Nigerian company with diversified operations across the country. We are driven by a purpose-led mission to contribute to national food security and promote environmentally sustainable agricultural practices.
          </p>
          <button onClick={() => setPage('about')} className="text-primary font-bold flex items-center gap-2 group">
            Learn More About Our Mission <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600" className="rounded-3xl aspect-square object-cover" alt="" />
          <img src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600" className="rounded-3xl aspect-square object-cover mt-12" alt="" />
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Core Value Chains" subtitle="What We Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: 'Fish Farming', icon: <Fish />, img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600', desc: 'Smart, efficiency-driven fish production facility with a stocking capacity of 11,000 fish per cycle.' },
            { title: 'Yam Cultivation', icon: <Sprout />, img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600', desc: 'Commercial yam cultivation focusing on export-quality tubers and organic soil enrichment.' },
            { title: 'BSF Farming', icon: <Bug />, img: 'https://images.unsplash.com/photo-1594761053847-d5d401309c91?q=80&w=600', desc: 'Circular bio-economy model converting organic waste into high-value agricultural inputs.' }
          ].map((div, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="bg-paper rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group cursor-pointer border border-primary/5"
              onClick={() => setPage('services')}
            >
              <div className="h-48 sm:h-64 overflow-hidden relative">
                <img src={div.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 bg-surface rounded-xl flex items-center justify-center text-primary shadow-lg">
                  {React.cloneElement(div.icon as React.ReactElement, { size: 20 })}
                </div>
              </div>
              <div className="p-6 md:p-10">
                <h3 className="text-xl md:text-2xl font-serif text-primary mb-3 md:mb-4">{div.title}</h3>
                <p className="text-primary/60 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{div.desc}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Dashboard Preview */}
    <section className="section-padding bg-primary text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <SectionHeading title="Data-Driven Agriculture" subtitle="Performance Metrics" light />
          <p className="text-accent/60 text-lg mb-12 font-light leading-relaxed">
            We monitor every aspect of our production cycles to ensure maximum efficiency and sustainability. From survival rates to ROI, our data speaks for itself.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-4xl font-serif text-gold">89%</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent/40">Fish Survival Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif text-gold">98%</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent/40">Yam ROI</p>
            </div>
          </div>
          <button onClick={() => setPage('dashboard')} className="btn-premium">
            Explore Full Dashboard
          </button>
        </div>
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={DASHBOARD_DATA.monthlyProduction}>
              <defs>
                <linearGradient id="colorCatfish" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.5)" />
              <YAxis axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: '#1B4332', border: 'none', borderRadius: '1rem' }} />
              <Area type="monotone" dataKey="catfish" stroke="#D4AF37" fillOpacity={1} fill="url(#colorCatfish)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>

    {/* Team Preview */}
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeading title="The Minds Behind Saaj Farms" subtitle="Our Leadership" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {TEAM_MEMBERS.slice(0, 4).map((member, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 md:mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                <img src={member.img} className="w-full h-full object-cover" alt="" />
              </div>
              <h4 className="text-lg md:text-xl font-serif text-primary">{member.name}</h4>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gold">{member.role}</p>
            </motion.div>
          ))}
        </div>
        <button onClick={() => setPage('team')} className="btn-outline border-primary text-primary w-full sm:w-auto mx-auto">
          Meet the Full Team
        </button>
      </div>
    </section>

    {/* Blog Preview */}
    <section className="section-padding bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <SectionHeading title="Corporate Insights" subtitle="Our Blog" />
          <button onClick={() => setPage('blog')} className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-12">
            View All Posts <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <div key={post.id} className="group cursor-pointer" onClick={() => setPage(`post:${post.id}`)}>
              <div className="aspect-video rounded-[2rem] overflow-hidden mb-6 shadow-md">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <span className="text-gold font-black uppercase tracking-widest text-[8px] mb-2 block">{post.category}</span>
              <h4 className="text-xl font-serif text-primary group-hover:text-secondary transition-colors">{post.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Gallery Preview */}
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Operations in Motion" subtitle="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_MEDIA.slice(0, 4).map((m, i) => (
            <div key={i} className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => setPage('gallery')}>
              <img src={m.type === 'image' ? m.src : m.poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact CTA */}
    <section className="section-padding bg-gold text-primary">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif italic">Ready to grow with us?</h2>
        <p className="text-lg font-light">We welcome external investment from reputable, value-aligned partners across local and international markets.</p>
        <button onClick={() => setPage('contact')} className="bg-primary text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-secondary transition-all">
          Get In Touch
        </button>
      </div>
    </section>
  </div>
);

const useThemeColors = () => {
  const [colors, setColors] = useState({
    primary: '#1B4332',
    secondary: '#40916C',
    text: '#1B4332',
    grid: 'rgba(27, 67, 50, 0.05)',
    surface: '#FFFFFF'
  });

  useEffect(() => {
    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      setColors({
        primary: style.getPropertyValue('--primary').trim() || '#1B4332',
        secondary: style.getPropertyValue('--secondary').trim() || '#40916C',
        text: style.getPropertyValue('--text-main').trim() || '#1B4332',
        grid: style.getPropertyValue('--chart-grid').trim() || 'rgba(0,0,0,0.05)',
        surface: style.getPropertyValue('--surface').trim() || '#FFFFFF'
      });
    };

    updateColors();
    
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return colors;
};

const DashboardPage = () => {
  const chartColors = useThemeColors();

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Operational Intelligence" subtitle="Production Statistics Dashboard" />
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {DASHBOARD_DATA.metrics.map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-8 rounded-[2.5rem] shadow-sm border border-primary/5"
            >
              <div className="text-secondary mb-4">{card.icon}</div>
              <h4 className="text-3xl font-serif text-primary mb-1">{card.val}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">{card.label}</p>
              <p className="text-[8px] font-bold text-secondary mt-2">{card.unit}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <div className="bg-surface p-10 rounded-[3rem] shadow-sm border border-primary/5">
            <h4 className="text-xl font-serif text-primary mb-8">Monthly Catfish Production (Tons)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={DASHBOARD_DATA.monthlyProduction}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} stroke={chartColors.text} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke={chartColors.text} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: chartColors.surface, color: chartColors.text }} />
                <Line type="monotone" dataKey="catfish" stroke={chartColors.primary} strokeWidth={4} dot={{ r: 6, fill: '#D4AF37', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-surface p-10 rounded-[3rem] shadow-sm border border-primary/5">
            <h4 className="text-xl font-serif text-primary mb-8">Revenue Distribution by Division (%)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={DASHBOARD_DATA.revenueDistribution} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {DASHBOARD_DATA.revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: chartColors.surface, color: chartColors.text }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Aquaculture', 'Yam Production', 'Sustainable Farming', 'Agribusiness Strategy', 'BSF Production'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(p => 
      (filter === 'All' || p.category === filter) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
    );
  }, [filter, search]);

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Corporate Insights" subtitle="Our Blog" />
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center mb-16">
          <div className="flex gap-4 overflow-x-auto pb-4 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                  filter === cat ? "bg-primary text-white shadow-xl" : "bg-paper text-primary/50 hover:bg-primary/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-paper rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary" 
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredPosts.map(post => (
            <motion.article 
              layout
              key={post.id} 
              className="group cursor-pointer"
              onClick={() => setPage(`post:${post.id}`)}
            >
              <div className="h-64 sm:h-72 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 shadow-xl relative">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gold text-primary px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="px-2 md:px-4">
                <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-3 md:mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gold rounded-full"></span>
                  <span>By {post.author}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif text-primary mb-3 md:mb-4 group-hover:text-secondary transition-colors leading-tight">{post.title}</h4>
                <p className="text-primary/60 text-xs md:text-sm mb-6 md:mb-8 line-clamp-3 font-light leading-relaxed">{post.excerpt}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                  Read Full Article <ArrowRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostPage = ({ id, setPage }: { id: string, setPage: (p: Page) => void }) => {
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) return <div>Post not found</div>;

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setPage('blog')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary dark:text-accent mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={14} /> Back to Blog
        </button>
        
        <div className="mb-12">
          <span className="text-gold font-black uppercase tracking-widest text-[10px] mb-4 block">{post.category}</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary leading-tight mb-8">{post.title}</h1>
          <div className="flex items-center gap-6 border-y border-primary/10 py-6">
            <div className="w-12 h-12 bg-paper rounded-full flex items-center justify-center">
              <Users className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{post.author}</p>
              <p className="text-[10px] text-primary/40 uppercase tracking-widest">{post.date}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
          <img src={post.image} className="w-full aspect-video object-cover" alt="" />
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none font-light leading-relaxed text-primary/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-12 border-t border-primary/10 flex flex-wrap justify-between items-center gap-8">
          <div className="flex gap-4">
            <button className="p-4 bg-paper rounded-2xl text-primary hover:bg-gold transition-all"><Share2 size={20} /></button>
            <button className="p-4 bg-paper rounded-2xl text-primary hover:bg-gold transition-all"><MessageSquare size={20} /></button>
          </div>
          <div className="flex gap-2">
            {['Aquaculture', 'Strategy', 'Ethics'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-paper rounded-full text-[10px] font-bold uppercase tracking-widest text-primary/40">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const categories = ['All', 'Catfish Operations', 'Yam Farms', 'BSF Production', 'Training & Events'];

  const filteredMedia = useMemo(() => 
    filter === 'All' ? GALLERY_MEDIA : GALLERY_MEDIA.filter(m => m.category === filter),
    [filter]
  );

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Operations in Action" subtitle="Corporate Gallery" />
        
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-primary text-white shadow-xl" : "bg-paper text-primary/50 hover:bg-primary/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredMedia.map((media) => (
            <motion.div 
              layout
              key={media.id} 
              onClick={() => setSelectedMedia(media)}
              className="group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-2xl transition-all"
            >
              <img 
                src={media.type === 'image' ? media.src : media.poster} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={media.title} 
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-10">
                <span className="text-gold font-black uppercase tracking-widest text-[8px] mb-2">{media.category}</span>
                <h4 className="text-white text-lg md:text-xl font-serif italic">{media.title}</h4>
                {media.type === 'video' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-4 md:p-5 rounded-full text-primary"><Play className="fill-current" size={20} /></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
          >
            <button onClick={() => setSelectedMedia(null)} className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform"><X size={40} /></button>
            <div className="max-w-5xl w-full max-h-[80vh] bg-black rounded-[3rem] overflow-hidden shadow-2xl relative">
              {selectedMedia.type === 'image' ? (
                <img src={selectedMedia.src} className="w-full h-full object-contain" alt="" />
              ) : (
                <video src={selectedMedia.src} controls autoPlay className="w-full h-full" />
              )}
              <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h4 className="text-3xl font-serif italic">{selectedMedia.title}</h4>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mt-2">{selectedMedia.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = ({ setPage, theme, setTheme }: { setPage: (p: Page) => void, theme: ThemeMode, setTheme: (t: ThemeMode) => void }) => (
  <footer className="bg-primary text-white pt-32 pb-12 px-6 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-4 gap-20 mb-20">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
              <Leaf className="text-primary w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-black tracking-tight leading-none">SAAJ FARMS</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Agribusiness Corp</span>
            </div>
          </div>
          <p className="text-accent/60 max-w-sm italic font-light leading-relaxed">
            Pioneering sustainable, data-driven agricultural systems in Northern Nigeria. Rooted in integrity, driven by innovation.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <button key={i} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all">
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-gold font-black uppercase tracking-widest text-[10px] mb-8">Corporate</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase text-accent/50">
            {['Home', 'About', 'Team', 'Testimonials', 'Services', 'Dashboard', 'Gallery', 'Blog'].map(link => (
              <li key={link} onClick={() => setPage(link.toLowerCase() as Page)} className="hover:text-white cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-black uppercase tracking-widest text-[10px] mb-8">Theme Settings</h4>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent/30">© 2026 SAAJ FARMS AGRI-TECH. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-accent/30">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Investor Portal</a>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
  </footer>
);

// --- Main App ---

const App = () => {
  const [activePage, setPage] = useState<Page>('home');
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('saaj-theme') as ThemeMode) || 'system');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('saaj-theme', theme);
    const root = window.document.documentElement;
    
    const applyTheme = (mode: ThemeMode) => {
      root.classList.remove('light', 'dark');
      if (mode === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(mode);
      }
    };

    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderContent = () => {
    if (activePage.startsWith('post:')) {
      const id = activePage.split(':')[1];
      return <BlogPostPage id={id} setPage={setPage} />;
    }

    switch (activePage) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'dashboard': return <DashboardPage />;
      case 'gallery': return <GalleryPage />;
      case 'team': return <TeamPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'blog': return <BlogPage setPage={setPage} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-gold/30 selection:text-primary transition-colors duration-500">
      <Navbar activePage={activePage} setPage={setPage} theme={theme} setTheme={setTheme} />
      <main>
        {renderContent()}
      </main>
      <Footer setPage={setPage} theme={theme} setTheme={setTheme} />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamPage = () => {
  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Corporate Leadership" subtitle="Our Team" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-primary/5"
            >
              <div className="h-80 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={member.img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-serif text-primary mb-1">{member.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">{member.role}</p>
                <p className="text-primary/60 text-xs leading-relaxed mb-8">{member.bio}</p>
                <div className="flex gap-4">
                  <button className="p-2 bg-paper rounded-full text-primary hover:bg-gold transition-colors"><Mail size={14} /></button>
                  <button className="p-2 bg-paper rounded-full text-primary hover:bg-gold transition-colors"><Phone size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialsPage = () => {
  const testimonials = [
    { name: 'Alhaji Ibrahim Musa', role: 'Distributor', text: 'Saaj Farms has consistently delivered high-quality catfish that meets our export standards. Their reliability is unmatched in the region.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
    { name: 'Dr. Amina Bello', role: 'Agricultural Consultant', text: 'The circular model implemented at Saaj Farms is a blueprint for sustainable agribusiness in West Africa. Their BSF production is revolutionary.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200' },
    { name: 'Engr. Yusuf Garba', role: 'Investor', text: 'Transparency and ethical operations are why I chose to partner with Saaj. The data-driven approach to farming ensures consistent returns.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200' },
  ];

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="What Our Partners Say" subtitle="Testimonials" />
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-10 rounded-[3rem] shadow-sm border border-primary/5 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <MessageCircle className="text-gold/10 absolute -top-4 -right-4 group-hover:scale-110 transition-transform" size={120} />
              <p className="text-lg italic font-light leading-relaxed text-primary/80 mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4 relative z-10">
                <img src={t.img} className="w-12 h-12 rounded-full object-cover border-2 border-gold/20" alt="" />
                <div>
                  <h4 className="font-serif text-primary">{t.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="Rooted in the Earth, Growing for Tomorrow" subtitle="About SAAJ Farms" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-32">
        <div className="space-y-8">
          <p className="text-lg md:text-xl font-light leading-relaxed text-earth/80 dark:text-white/70">
            SAAJ Farms is an agro-allied enterprise engaged in the cultivation, production, processing, and commercialization of Shariah-compliant agricultural products in Nigeria.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed text-earth/60 dark:text-white/50">
            The business operates under SAAJ Multipurpose Limited, a duly registered Nigerian company with diversified operations across the country. We are driven by a purpose-led mission to contribute to national food security, create employment opportunities, and promote environmentally sustainable agricultural practices across its areas of operation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-8">
            <div className="p-6 md:p-8 bg-surface rounded-[2rem] border border-primary/5">
              <ShieldCheck className="text-gold mb-4" size={32} />
              <h4 className="text-lg md:text-xl font-serif mb-2">Ethical Standards</h4>
              <p className="text-xs text-primary/50">Strict adherence to Shariah-compliant and ethical aquaculture standards.</p>
            </div>
            <div className="p-6 md:p-8 bg-surface rounded-[2rem] border border-primary/5">
              <Recycle className="text-gold mb-4" size={32} />
              <h4 className="text-lg md:text-xl font-serif mb-2">Circular Economy</h4>
              <p className="text-xs text-primary/50">Integrated systems where waste from one division fuels production in another.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000" className="rounded-[2.5rem] md:rounded-[4rem] shadow-2xl w-full" alt="" />
          <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-primary p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-white hidden sm:block">
            <h4 className="text-2xl md:text-4xl font-serif italic mb-2">Since 2021</h4>
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-accent">Advocating for Sustainable Development</p>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] mb-16 md:mb-32">
        <div className="max-w-3xl">
          <h3 className="text-3xl md:text-5xl font-serif mb-8 md:mb-12">Our Mission & Philosophy</h3>
          <div className="space-y-8 md:space-y-12">
            {[
              { title: 'National Food Security', desc: 'Delivering affordable, high-quality protein products to support national food security and reduce malnutrition.' },
              { title: 'Smart Agriculture', desc: 'Adopting smart and sustainable agricultural practices across operations to ensure long-term productivity.' },
              { title: 'Environmental Responsibility', desc: 'Responsible organic waste management across all value chains through our circular bio-economy model.' }
            ].map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="text-gold text-2xl font-serif italic">0{i+1}</div>
                <div>
                  <h4 className="text-xl md:text-2xl font-serif mb-2 md:mb-4">{m.title}</h4>
                  <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="Our Integrated Value Chains" subtitle="What We Do" />
      
      <div className="space-y-16 md:space-y-32">
        {/* Fish Farming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-paper dark:bg-stone-800 rounded-xl flex items-center justify-center text-primary dark:text-gold"><Fish /></div>
              <h3 className="text-2xl md:text-3xl font-serif dark:text-white">Fish Farming Operations</h3>
            </div>
            <p className="text-base md:text-lg text-earth/70 dark:text-white/60 mb-8 md:mb-12 font-light leading-relaxed">
              SAAJ Farms operates a smart, efficiency-driven fish production facility on a 130 ft × 100 ft site. We maintain five ponds with a stocking capacity of 11,000 fish per production cycle.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 89% Survival Rate</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 1.4kg Harvest Weight</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 65.3% Profit Margin</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> Hybrid Species</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=1000" className="rounded-[2rem] md:rounded-[3rem] shadow-xl w-full" alt="" />
          </div>
        </div>

        {/* Yam Cultivation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="order-1">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000" className="rounded-[2rem] md:rounded-[3rem] shadow-xl w-full" alt="" />
          </div>
          <div className="order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-paper dark:bg-stone-800 rounded-xl flex items-center justify-center text-primary dark:text-gold"><Sprout /></div>
              <h3 className="text-2xl md:text-3xl font-serif dark:text-white">Yam Cultivation</h3>
            </div>
            <p className="text-base md:text-lg text-earth/70 dark:text-white/60 mb-8 md:mb-12 font-light leading-relaxed">
              Engaged in yam cultivation, storage, and market distribution across two hectares. Our pilot scheme recorded an estimated return on investment of about 98% per production cycle.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 3,360 Stands/Hectare</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 98% ROI</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> Value-added Processing</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> Organic Enrichment</li>
            </ul>
          </div>
        </div>

        {/* BSF Farming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-paper dark:bg-stone-800 rounded-xl flex items-center justify-center text-primary dark:text-gold"><Bug /></div>
              <h3 className="text-2xl md:text-3xl font-serif dark:text-white">Black Soldier Fly Farming</h3>
            </div>
            <p className="text-base md:text-lg text-earth/70 dark:text-white/60 mb-8 md:mb-12 font-light leading-relaxed">
              Operating a circular bio-economy model that converts organic waste into high-value agricultural inputs. Our BSF unit delivers an estimated return on investment of approximately 93%.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 1,800kg Waste/Cycle</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 750kg Harvested Larvae</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> 93% ROI</li>
              <li className="flex items-center gap-3 text-sm text-primary/50"><CheckCircle2 className="text-gold" size={16}/> Organic Frass Fertilizer</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1594761053847-d5d401309c91?q=80&w=1000" className="rounded-[2rem] md:rounded-[3rem] shadow-xl w-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
      <div>
        <SectionHeading title="Global Partnerships" subtitle="Contact Us" />
        <p className="text-primary/70 text-base md:text-lg mb-8 md:mb-12 font-light leading-relaxed">
          We are open to strategic partnerships, large-scale distribution agreements, and investor inquiries. Our corporate headquarters are located in Minna, Niger State.
        </p>
        <div className="space-y-6 md:space-y-10">
          {[
            { icon: <MapPin />, label: 'Headquarters', val: 'Brighter Area, Behind An-Nur schools, Minna, Niger State.' },
            { icon: <Phone />, label: 'Investor Relations', val: '+234 38434587, +234 8062350251' },
            { icon: <Mail />, label: 'Corporate Email', val: 'saajmultipurposelimited@gmail.com' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 md:gap-6 items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-surface rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/5 shrink-0">
                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">{item.label}</p>
                <p className="text-lg md:text-xl font-serif text-primary leading-tight">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-primary/5">
        <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Full Name</label>
              <input type="text" className="w-full bg-paper border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-serif text-lg text-primary" placeholder="John Doe" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Corporate Email</label>
              <input type="email" className="w-full bg-paper border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-serif text-lg text-primary" placeholder="john@company.com" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Inquiry Type</label>
            <select className="w-full bg-paper border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-serif text-lg appearance-none text-primary">
              <option>Investor Inquiry</option>
              <option>Partnership Proposal</option>
              <option>Large Scale Distribution</option>
              <option>General Corporate Inquiry</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Message</label>
            <textarea rows={4} className="w-full bg-paper border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-serif text-lg resize-none text-primary" placeholder="How can we collaborate?"></textarea>
          </div>
          <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  </div>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

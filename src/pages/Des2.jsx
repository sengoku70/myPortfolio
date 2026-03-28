import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Cpu,
  Database,
  Globe,
  Code2,
  GraduationCap,
  Calendar,
  ChevronRight,
  Palette,
  Monitor,
  Cloud,
  Zap,
  Award,
  FileText
} from "lucide-react";

// Color definitions in RGB for Tailwind opacity compatibility
const COLOR_COMBOS = [
  {
    name: "Pure Glass",
    primary: "79 70 229", // Indigo 600
    secondary: "124 58 237", // Violet 600
    accent: "219 39 119", // Pink 600
    bg: "#ffffff"
  },
  {
    name: "Oceanic",
    primary: "2 132 199", // Sky 600
    secondary: "5 150 105", // Emerald 600
    accent: "79 70 229", // Indigo 600
    bg: "#ffffff"
  },
  {
    name: "Sunset",
    primary: "220 38 38", // Red 600
    secondary: "217 119 6", // Amber 600
    accent: "124 58 237", // Violet 600
    bg: "#ffffff"
  }
];

// Glassmorphism UI Components for Light Theme
const Card = ({ children, className = "" }) => (
  <div className={`backdrop-blur-2xl bg-white/40 border border-white/60 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/60 hover:border-primary/30 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-50" />
    <div className="relative z-10">{children}</div>
  </div>
);

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "backdrop-blur-md bg-primary/80 hover:bg-primary text-white border border-primary/20 shadow-[0_15px_30px_-5px_rgba(var(--primary),0.3)]",
    outline: "backdrop-blur-md border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow-md transition-all",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
  };
  return (
    <button className={`px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="p-3 rounded-2xl backdrop-blur-xl bg-primary/10 border border-primary/20 text-primary">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
  </div>
);

const InteractiveCube = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientY - window.innerHeight / 2) / 30;
    const y = (clientX - window.innerWidth / 2) / 30;
    setRotation({ x: -x, y: y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const faceStyle = "absolute w-36 h-36 border-[1px] border-primary/20 backdrop-blur-md bg-white/30 flex items-center justify-center select-none shadow-[0_0_20px_rgba(var(--primary),0.05)]";

  return (
    <div className="flex justify-center mb-24 relative" style={{ perspective: '1200px' }}>
      {/* Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 bg-primary/30 blur-[40px] rounded-full z-0"
      />
      
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-36 h-36 z-10"
      >
        {/* Front */}
        <div className={`${faceStyle} overflow-hidden`} style={{ transform: 'translateZ(72px)' }}>
          <img src="/image/profile.png" alt="Profile" className="w-full h-full object-cover opacity-90" />
        </div>
        {/* Back */}
        <div className={faceStyle} style={{ transform: 'rotateY(180deg) translateZ(72px)' }} />
        {/* Right */}
        <div className={faceStyle} style={{ transform: 'rotateY(90deg) translateZ(72px)' }} />
        {/* Left */}
        <div className={faceStyle} style={{ transform: 'rotateY(-90deg) translateZ(72px)' }} />
        {/* Top */}
        <div className={faceStyle} style={{ transform: 'rotateX(90deg) translateZ(72px)' }} />
        {/* Bottom */}
        <div className={faceStyle} style={{ transform: 'rotateX(-90deg) translateZ(72px)' }} />
      </motion.div>
    </div>
  );
};

export default function WhiteGlassPortfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentCombo, setCurrentCombo] = useState(COLOR_COMBOS[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * COLOR_COMBOS.length);
    setCurrentCombo(COLOR_COMBOS[randomIndex]);
  }, []);

  const cssVariables = useMemo(() => ({
    "--primary": currentCombo.primary,
    "--secondary": currentCombo.secondary,
    "--accent": currentCombo.accent,
    "--bg": currentCombo.bg,
  }), [currentCombo]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", currentCombo.primary);
    root.style.setProperty("--secondary", currentCombo.secondary);
    root.style.setProperty("--accent", currentCombo.accent);
  }, [currentCombo]);

  const projects = [
    {
      title: "ElectroSystem",
      desc: "Interactive platform for hybrid wind-solar energy systems with cost estimation and smooth animations.",
      tech: ["React", "Node.js", "TailwindCSS"],
      link: "https://sengoku70-electrosystemsgithub-ix1lkvdop.vercel.app",
      github: "https://github.com/sengoku70/electrosystems.github.io.git",
      colors: ["primary", "secondary"],
      img: "/image/image.png",
      date: "Dec 2025"
    },
    {
      title: "Amazon Clone",
      desc: "Full-stack e-commerce engine with JWT auth, MongoDB, and production-ready modular architecture.",
      tech: ["Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      link: "https://amazon-clone-seven-green.vercel.app",
      img: "/image/Screenshot 2026-03-24 182638.png",
      colors: ["accent", "primary"],
      date: "Oct 2025"
    },
    {
      title: "TimeBinder",
      desc: "Productivity ecosystem with Sticky Notes, Focus Mode, and custom syllabus management.",
      tech: ["React Native", "Expo", "SQLite", "TailwindCSS"],
      link: "https://github.com/sengoku70/TimeBinder_Mobile_app.git",
      img: "/image/WhatsApp Image 2025-11-18 at 11.49.04 AM.jpeg",
      colors: ["secondary", "accent"],
      date: "Sep 2025"
    },
    {
      title: "Cubicle",
      desc: "Interactive 3D Rubik's Cube visualizer and solution guide for learning algorithms through immersion.",
      tech: ["React", "Three.js", "TailwindCSS"],
      link: "https://cubicle-beta.vercel.app",
      img: "/image/Screenshot 2026-03-24 182734.png",
      colors: ["primary", "accent"],
      date: "Aug 2025"
    }
  ];

  const skills = [
    { 
      category: "Languages", 
      items: [
        { name: "C++", logo: "cplusplus" },
        { name: "Python", logo: "python" },
        { name: "JavaScript", logo: "javascript" },
        { name: "C", logo: "c" },
        { name: "PHP", logo: "php" }
      ], 
      icon: Terminal 
    },
    { 
      category: "Frameworks", 
      items: [
        { name: "React", logo: "react" },
        { name: "React Native", logo: "react" },
        { name: "Node.js", logo: "nodejs" },
        { name: "TailwindCSS", logo: "tailwindcss" },
        { name: "Express.js", logo: "express" }
      ], 
      icon: Cpu 
    },
    { 
      category: "Tools & DB", 
      items: [
        { name: "MySQL", logo: "mysql" },
        { name: "PostgreSQL", logo: "postgresql" },
        { name: "SQLite", logo: "sqlite" },
        { name: "MongoDB", logo: "mongodb" },
        { name: "JWT", logo: "npm" }
      ], 
      icon: Database 
    },
    { 
      category: "Platforms", 
      items: [
        { name: "Render", logo: "cloud" },
        { name: "AWS", logo: "amazonwebservices" },
        { name: "Figma", logo: "figma" },
        { name: "VS Code", logo: "vscode" },
        { name: "MongoDB Compass", logo: "mongodb" },
        { name: "Vercel", logo: "vercel" },
        { name: "GitHub", logo: "github" }
      ], 
      icon: Globe 
    }
  ];

  const certificates = [
    { 
      title: "Cloud Computing Fundamentals ", 
      issuer: "LPU Professional Certification", 
      link: "https://drive.google.com/file/d/1Dtn1ejB1cyAnE6beDuPDk8mEgodjF7m6/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1Dtn1ejB1cyAnE6beDuPDk8mEgodjF7m6"
    },
    { 
      title: "webdevelopment using .NET", 
      issuer: "Advanced Credential", 
      link: "https://drive.google.com/file/d/1aRJjplp7NhVa9ZZIoo5OiBzEvcV_XaYW/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1aRJjplp7NhVa9ZZIoo5OiBzEvcV_XaYW"
    },
    { 
      title: "Data structures and algorithms", 
      issuer: "MySQL Mastery", 
      link: "https://drive.google.com/file/d/1h8Pb7wKZ8gBXqN7IztEZMkVFJ0qSg_QG/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1h8Pb7wKZ8gBXqN7IztEZMkVFJ0qSg_QG"
    },
    { 
      title: "JavaScript Programming", 
      issuer: "Frontend Academy", 
      link: "https://drive.google.com/file/d/1t-HSwB2JoMOdVDrNFTvv5CQuRTyL5hqe/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1t-HSwB2JoMOdVDrNFTvv5CQuRTyL5hqe"
    }
  ];

  return (
    <div 
      className="min-h-screen transition-all duration-1000 text-slate-600 selection:bg-primary/20 selection:text-primary"
      style={{ ...cssVariables, backgroundColor: '#ffffff' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${currentCombo.primary};
          --secondary: ${currentCombo.secondary};
          --accent: ${currentCombo.accent};
        }
        .text-primary { color: rgb(var(--primary)); }
        .bg-primary { background-color: rgb(var(--primary)); }
        .border-primary { border-color: rgb(var(--primary)); }
        
        /* Tailwind Opacity helpers for CSS variables */
        .bg-primary\\/10 { background-color: rgb(var(--primary) / 0.1); }
        .bg-primary\\/20 { background-color: rgb(var(--primary) / 0.2); }
        .bg-primary\\/80 { background-color: rgb(var(--primary) / 0.8); }
        .border-primary\\/20 { border-color: rgb(var(--primary) / 0.2); }

        .cube-face {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
          border-color: rgba(var(--primary), 0.2) !important;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />

      {/* Blurred Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-slate-50/50">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-accent/15 blur-[110px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[10%] w-[350px] h-[350px] bg-secondary/10 blur-[90px] rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, 100, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute middle-[50%] right-[10%] w-[450px] h-[450px] bg-primary/15 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] right-[30%] w-[400px] h-[400px] bg-primary/20 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], y: [0, -60, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-secondary/15 blur-[110px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, 80, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[50%] w-[350px] h-[350px] bg-accent/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [100, -100, 100] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[40%] w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full" 
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center">
        <div className="backdrop-blur-2xl bg-white/60 border-[1.5px] border-slate-200/80 px-8 py-3 rounded-full flex items-center justify-between gap-12 max-w-4xl w-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Baibhav Kumar <span className="text-primary">.</span></h1>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["About", "Skills", "Certificates", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-primary transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <Button
            variant="primary"
            className="text-xs px-4 py-2"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hire Me
          </Button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section className="py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <InteractiveCube />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/40 border border-slate-200 shadow-sm text-xs font-semibold text-primary mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Available for Internships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]"
          >
            MERN <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, rgb(var(--primary)), rgb(var(--accent)), rgb(var(--secondary)))` }}
            >
              Developer.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
          >
            I'm Baibhav Kumar, a CS student at LPU specialized in building high-performance,
            scalable applications with focus on <span className="text-primary font-bold">Full Stack Engineering</span> and modern UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open('https://docs.google.com/document/d/1cG93zqbI2-AI0efASgUusBL7ZhYprXWr/edit?usp=drive_link&ouid=106404007283014769053&rtpof=true&sd=true', '_blank')}
            >
              <FileText size={18} /> View Resume
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </motion.div>
        </section>

        {/* Bento About & Education Section */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <Card className="md:col-span-2 p-10 relative group border-primary/20 bg-primary/5">
            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">The Architect</h3>
            <p className="text-xl text-slate-700 leading-relaxed max-w-2xl font-medium">
              Currently pursuing B.Tech in Computer Science at Lovely Professional University.
              My journey is fueled by a curiosity for how large-scale systems work and a drive
              to create digital solutions that make an impact. I thrive at the intersection
              of clean code and beautiful design.
            </p>
          </Card>

          <Card className="p-8 flex flex-col justify-between">
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-slate-900 font-bold">LPU</div>
                <div className="text-xs text-primary mb-1">2023 - Present</div>
                <div className="text-sm text-slate-500">B.Tech (Computer Science)</div>
              </div>
              <div className="backdrop-blur-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-slate-900 font-bold">New Era Public School</div>
                <div className="text-xs text-primary mb-1">2020 - 2022</div>
                <div className="text-sm text-slate-500">Intermediate (64%)</div>
              </div>
              <div className="backdrop-blur-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-slate-900 font-bold">Sambhawana Awasiye</div>
                <div className="text-xs text-primary mb-1">2019 - 2020</div>
                <div className="text-sm text-slate-500">Matriculation (72%)</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32">
          <SectionHeading icon={Terminal}>Technical Stack</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <Card key={idx} className="p-6 group hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl backdrop-blur-xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                    <skill.icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item.name} className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary/30 transition-all shadow-sm flex items-center gap-2 group/item">
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.logo}/${item.logo}-original.svg`} 
                        alt={item.name}
                        className="w-4 h-4 group-hover/item:scale-125 transition-transform"
                        onError={(e) => { e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg'; }}
                      />
                      {item.name}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certificates" className="mb-32">
          <SectionHeading icon={Award}>Certifications</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => window.open(cert.link, "_blank")}
              >
                <Card className="p-0 h-full flex flex-col border-slate-200 hover:border-primary/30 group overflow-hidden">
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={cert.img} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-white/70 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform border-t border-slate-200">
                      <div className="text-[10px] text-slate-900 font-bold uppercase tracking-widest text-center">Verify Credential</div>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="flex items-center gap-2 mb-2">
                       <Award size={14} className="text-primary" />
                       <p className="text-xs text-slate-500 capitalize">{cert.issuer}</p>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-primary transition-colors">{cert.title}</h4>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionHeading icon={Globe}>Recent Works</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                onHoverStart={() => setHoveredProject(idx)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
                onClick={() => window.open(project.link, "_blank")}
                className="relative cursor-pointer group/card"
              >
                <Card className="p-0 h-full border-slate-200 bg-white/30 transition-colors group-hover/card:border-primary/30 group-hover/card:bg-white/50">
                  <div 
                    className="aspect-video w-full mb-6 transition-all duration-500 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-slate-100/30 z-0" />
                    {project.img && (
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-white/80 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform border-t border-slate-200">
                      <div className="text-xs text-slate-500 font-mono">{project.date}</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 gap-3">
                      <Button 
                        variant="primary" 
                        className="gap-2 shadow-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github || project.link, "_blank");
                        }}
                      >
                        <Github size={16} /> Code
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 shadow-lg bg-white/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                      >
                        <ExternalLink size={16} /> Live
                      </Button>
                    </div>
                  </div>
                  <div className="px-6 pb-6 mt-[-1rem]">
                    <div className="flex justify-between items-start mb-2 text-slate-900">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <ExternalLink size={20} className="hover:text-primary transition-colors text-slate-400 hover:text-primary" />
                    </div>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-primary px-2.5 py-1 rounded-full backdrop-blur-md bg-primary/5 border border-primary/10">{t}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Beyond Code Section */}
        <section id="beyond-code" className="mb-32 relative py-12">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[35rem] font-black text-[#22c55e] opacity-[0.6] select-none pointer-events-none z-0">
            &
          </div>
          <div className="relative z-10">
            <SectionHeading icon={Zap}>Beyond Code</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8 group hover:border-primary/20 bg-primary/5 transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-primary group-hover:scale-110 transition-transform">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Native Development (C++ & Qt)</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Currently deep-diving into <span className="text-primary font-semibold">C++ development using Qt</span> to build high-performance, native window applications. 
                      I'm focused on mastering low-level system control and creating fluid desktop experiences that interact directly with the OS.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 group hover:border-secondary/20 bg-secondary/5 transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-secondary group-hover:scale-110 transition-transform">
                    <Cloud size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Cloud & DevOps Mastery</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Expanding my knowledge base into <span className="text-secondary font-semibold">Cloud Infrastructure and DevOps pipelines</span>. 
                      Learning to architect scalable environments and automate delivery to push my digital solutions beyond just code and into robust, production-ready ecosystems.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12">
              <h4 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-slate-200"></span>
                Upcoming Projects
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest rounded-full">In Development</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Cloud Architect",
                    desc: "Simulated cloud architecture explorer focusing on multi-tier service orchestration and scalability.",
                    tech: ["AWS", "Docker", "Kubernetes", "C++"],
                    colors: ["primary", "secondary"]
                  },
                  {
                    title: "AI Class Converter",
                    desc: "AI-based offline to online class conversion system to transform physical learning content into interactive digital formats.",
                    tech: ["Python", "TensorFlow", "React Native", "Flask"],
                    colors: ["secondary", "accent"]
                  }
                ].map((proj, i) => (
                  <Card key={i} className="p-0 border-primary/10 overflow-hidden">
                    <div className="flex h-full flex-col md:flex-row">
                      <div className="md:w-1/3 aspect-square bg-slate-900 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-60" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <Terminal size={32} className="text-white opacity-50" />
                          <span className="text-[10px] text-white font-black uppercase tracking-[0.3em] animate-pulse">Upcoming</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-center">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{proj.title}</h4>
                        <p className="text-xs text-slate-500 mb-4">{proj.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {proj.tech.map(t => (
                            <span key={t} className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact">
          <Card className="p-12 text-center bg-primary/5 border-primary/10 shadow-sm">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Let's build something epic.</h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas or internships.
              Let's connect and see how I can contribute.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a href="mailto:baibhavkumar150@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                <Mail size={20} /> baibhavkumar150@gmail.com
              </a>
              <a href="https://github.com/sengoku70" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                <Github size={20} /> sengoku70
              </a>
              <a href="https://linkedin.com/in/150-baibhavkumar" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                <Linkedin size={20} /> Baibhav Kumar
              </a>
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-[0.2em]">
              © 2024 Baibhav Kumar. Built with Light Glassmorphism.
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

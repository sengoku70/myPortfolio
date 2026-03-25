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
  Award,
  FileText
} from "lucide-react";

// Color definitions in RGB for Tailwind opacity compatibility
const COLOR_COMBOS = [
  {
    name: "Neon Cyber",
    primary: "99 102 241", // #6366f1
    secondary: "59 130 246", // #3b82f6
    accent: "139 92 246", // #8b5cf6
    bg: "#0a0a0c"
  },
  {
    name: "Emerald Night",
    primary: "16 185 129", // #10b981
    secondary: "20 184 166", // #14b8a6
    accent: "52 211 153", // #34d399
    bg: "#020617"
  },
  {
    name: "Crimson Blaze",
    primary: "244 63 94", // #f43f5e
    secondary: "225 29 72", // #e11d48
    accent: "251 113 133", // #fb7185
    bg: "#0f0505"
  },
  {
    name: "Amber Sunset",
    primary: "245 158 11", // #f59e0b
    secondary: "217 119 6", // #d97706
    accent: "251 191 36", // #fbbf24
    bg: "#0c0a09"
  },
  {
    name: "Amethyst Myst",
    primary: "168 85 247", // #a855f7
    secondary: "236 72 153", // #ec4899
    accent: "217 70 239", // #d946ef
    bg: "#0d0a14"
  },
  {
    name: "Cyan Deep",
    primary: "6 182 212", // #06b6d4
    secondary: "14 165 233", // #0ea5e9
    accent: "34 211 238", // #22d3ee
    bg: "#05090f"
  }
];

// Local UI Components
const Card = ({ children, className = "" }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/30 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-primary hover:bg-secondary text-white shadow-lg shadow-primary/20",
    outline: "border border-primary/30 hover:bg-primary/10 text-white backdrop-blur-sm",
    ghost: "text-white/70 hover:text-white hover:bg-white/10"
  };
  return (
    <button className={`px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold text-white tracking-tight">{children}</h2>
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

  const faceStyle = "absolute w-36 h-36 border-[4px] border-white/90 bg-primary/10 flex items-center justify-center select-none cube-face";

  return (
    <div className="flex justify-center mb-24" style={{ perspective: '1200px' }}>
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-36 h-36"
      >
        {/* Front */}
        <div className={`${faceStyle} overflow-hidden`} style={{ transform: 'translateZ(72px)' }}>
          <img src="/image/profile.png" alt="Profile" className="w-full h-full object-cover opacity-80" />
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

export default function PremiumPortfolio() {
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

  // Inject colors into Tailwind classes using arbitrary properties
  // This is better than manually injecting every variable
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
      link: "https://sengoku70-electrosystemsgithubio.vercel.app",
      github: "https://github.com/sengoku70/electrosystems.github.io.git",
      colors: ["primary", "secondary"],
      img: "/image/image.png",
      date: "Dec 2025"
    },
    {
      title: "Amazon Clone",
      desc: "Full-stack e-commerce engine with JWT auth, MongoDB, and production-ready modular architecture.",
      tech: ["Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      link: "https://github.com/sengoku70/Amazon-clone.git",
      img: "/image/Screenshot 2026-03-24 182638.png",
      colors: ["accent", "primary"],
      date: "Oct 2025"
    },
    {
      title: "TimeBinder",
      desc: "Productivity ecosystem with Sticky Notes, Focus Mode, and custom syllabus management.",
      tech: ["React Native", "Expo", "SQLite", "TailwindCSS"],
      link: "https://github.com/sengoku70/TimeBinder_Mobile_app.git",
      github: "https://github.com/sengoku70/TimeBinder_Mobile_app.git",
      img: "/image/WhatsApp Image 2025-11-18 at 11.49.04 AM.jpeg",
      colors: ["secondary", "accent"],
      date: "Sep 2025"
    },
    {
      title: "Cubicle",
      desc: "Interactive 3D Rubik's Cube visualizer and solution guide for learning algorithms through immersion.",
      tech: ["React", "Three.js", "TailwindCSS"],
      link: "https://cubicle-beta.vercel.app",
      github: "https://github.com/sengoku70/Cubicle.git",
      img: "/image/Screenshot 2026-03-24 182734.png",
      colors: ["primary", "accent"],
      date: "Aug 2025"
    }
  ];

  const skills = [
    { category: "Languages", items: ["C++", "JavaScript", "C", "PHP"], icon: Terminal },
    { category: "Frameworks", items: ["React", "Node.js", "TailwindCSS", "Express.js"], icon: Cpu },
    { category: "Tools & DB", items: ["MySQL", "MongoDB", "VS Code", "JWT"], icon: Database }
  ];

  const certificates = [
    { 
      title: "Full Stack Development", 
      issuer: "LPU Professional Certification", 
      link: "https://drive.google.com/file/d/1Dtn1ejB1cyAnE6beDuPDk8mEgodjF7m6/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1Dtn1ejB1cyAnE6beDuPDk8mEgodjF7m6"
    },
    { 
      title: "Data Structures & Algorithms", 
      issuer: "Advanced Credential", 
      link: "https://drive.google.com/file/d/1aRJjplp7NhVa9ZZIoo5OiBzEvcV_XaYW/view?usp=drive_link",
      img: "https://lh3.googleusercontent.com/d/1aRJjplp7NhVa9ZZIoo5OiBzEvcV_XaYW"
    },
    { 
      title: "Database Management", 
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
      className="min-h-screen transition-all duration-1000 text-slate-300 selection:bg-primary/30 selection:text-white"
      style={{ ...cssVariables, backgroundColor: 'var(--bg)' }}
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
        .text-secondary { color: rgb(var(--secondary)); }
        .bg-secondary { background-color: rgb(var(--secondary)); }
        .border-secondary { border-color: rgb(var(--secondary)); }
        .text-accent { color: rgb(var(--accent)); }
        .bg-accent { background-color: rgb(var(--accent)); }
        .border-red-accent { border-color: rgb(var(--accent)); }
        
        /* Tailwind Opacity helpers for CSS variables */
        .bg-primary\\/10 { background-color: rgba(var(--primary), 0.1); }
        .bg-primary\\/20 { background-color: rgba(var(--primary), 0.2); }
        .bg-primary\\/30 { background-color: rgba(var(--primary), 0.3); }
        .bg-secondary\\/10 { background-color: rgba(var(--secondary), 0.1); }
        .bg-secondary\\/20 { background-color: rgba(var(--secondary), 0.2); }
        .border-primary\\/20 { border-color: rgba(var(--primary), 0.2); }
        .border-primary\\/30 { border-color: rgba(var(--primary), 0.3); }
        .border-primary\\/50 { border-color: rgba(var(--primary), 0.5); }
        .text-primary\\/80 { color: rgba(var(--primary), 0.8); }
        .from-primary\\/20 { --tw-gradient-from: rgba(var(--primary), 0.2) var(--tw-gradient-from-position); }
        .to-secondary\\/20 { --tw-gradient-to: rgba(var(--secondary), 0.2) var(--tw-gradient-to-position); }
        .from-accent\\/20 { --tw-gradient-from: rgba(var(--accent), 0.2) var(--tw-gradient-from-position); }
        .to-primary\\/20 { --tw-gradient-to: rgba(var(--primary), 0.2) var(--tw-gradient-to-position); }
        .from-secondary\\/20 { --tw-gradient-from: rgba(var(--secondary), 0.2) var(--tw-gradient-from-position); }
        .to-accent\\/20 { --tw-gradient-to: rgba(var(--accent), 0.2) var(--tw-gradient-to-position); }
        .shadow-primary\\/20 { --tw-shadow-color: rgba(var(--primary), 0.2); --tw-shadow: var(--tw-shadow-colored); }
        .selection\\:bg-primary\\/30 *::selection { background-color: rgba(var(--primary), 0.3); }

        .cube-face {
          box-shadow: 0 0 50px rgb(var(--primary) / 0.6), inset 0 0 30px rgb(var(--secondary) / 0.4) !important;
          border-color: rgb(var(--primary) / 0.8) !important;
        }
      `}} />

      {/* Mesh Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center">
        <div className="backdrop-blur-md bg-black/40 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between gap-12 max-w-4xl w-full">
          <h1 className="text-xl font-black text-white tracking-tighter">Baibhav Kumar <span className="text-primary">.</span></h1>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["About", "Skills", "Certificates", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary transition-colors"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary mb-8"
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
            className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6 leading-[1.1]"
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
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            I'm Baibhav Kumar, a CS student at LPU specialized in building high-performance,
            scalable applications with focus on system architecture and modern UX.
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
          <Card className="md:col-span-2 p-8 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
              <Code2 size={120} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Architect</h3>
            <p className="text-slate-400 leading-relaxed max-w-xl">
              Currently pursuing B.Tech in Computer Science at Lovely Professional University.
              My journey is fueled by a curiosity for how large-scale systems work and a drive
              to create digital solutions that make an impact. I thrive at the intersection
              of clean code and beautiful design.
            </p>

          </Card>

          <Card className="p-8 flex flex-col justify-between">
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>
            <div className="space-y-6">
              <div>
                <div className="text-white font-bold">LPU</div>
                <div className="text-xs text-primary mb-1">2023 - Present</div>
                <div className="text-sm text-slate-400">B.Tech (Computer Science)</div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <div className="text-white font-bold">New Era Public School</div>
                <div className="text-xs text-primary mb-1">2020 - 2022</div>
                <div className="text-sm text-slate-400">Intermediate (64%)</div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <div className="text-white font-bold">Sambhawana Awasiye</div>
                <div className="text-xs text-primary mb-1">2019 - 2020</div>
                <div className="text-sm text-slate-400">Matriculation (72%)</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32">
          <SectionHeading icon={Terminal}>Technical Stack</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <Card key={idx} className="p-6 group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                    <skill.icon size={20} />
                  </div>
                  <h4 className="font-bold text-white">{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-white/5 text-sm text-slate-400 border border-primary/20 hover:border-primary/50 transition-all">
                      {item}
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
                <Card className="p-0 h-full flex flex-col border-primary/10 hover:border-primary/50 group overflow-hidden">
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-primary/5">
                    <img 
                      src={cert.img} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-black/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Verify Credential</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                       <Award size={14} className="text-primary" />
                       <p className="text-xs text-slate-400 capitalize">{cert.issuer}</p>
                    </div>
                    <h4 className="font-bold text-white text-sm leading-tight group-hover:text-primary transition-colors">{cert.title}</h4>
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
                <Card className="p-0 h-full border border-white/10 bg-white/5 transition-colors group-hover/card:border-white/20">
                  <div 
                    className="aspect-video w-full mb-6 transition-all duration-500 relative overflow-hidden group"
                    style={{ backgroundImage: `linear-gradient(to bottom right, rgba(var(--${project.colors[0]}), 0.2), rgba(var(--${project.colors[1]}), 0.2))` }}
                  >
                    {project.img && (
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform">
                      <div className="text-xs text-white font-mono">{project.date}</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                      <Button 
                        variant="primary" 
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github || project.link, "_blank");
                        }}
                      >
                        <Github size={16} /> Code
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 bg-black/40"
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
                    <div className="flex justify-between items-start mb-2 text-white">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <a href={project.link} className="hover:text-primary transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-primary/80 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/20">{t}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact">
          <Card className="p-12 text-center bg-primary/5 border-primary/20">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Let's build something epic.</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas or internships.
              Let's connect and see how I can contribute.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a href="mailto:baibhavkumar150@gmail.com" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                <Mail size={20} /> baibhavkumar150@gmail.com
              </a>
              <a href="https://github.com/sengoku70" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                <Github size={20} /> sengoku70
              </a>
              <a href="https://linkedin.com/in/150-baibhavkumar" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                <Linkedin size={20} /> Baibhav Kumar
              </a>
            </div>
            <div className="text-xs text-slate-600 uppercase tracking-[0.2em]">
              © 2024 Baibhav Kumar. Built with React & Framer Motion.
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

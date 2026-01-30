import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    ExternalLink,
    Calendar,
    Briefcase,
    ArrowDown,
    CheckCircle2,
    Code2,
    TrendingUp,
    FileText,
    Zap,
    Shield,
    Database,
    ChevronLeft,
    ChevronRight,
    Globe,
    Server,
    Terminal
} from 'lucide-react';
import {
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiJavascript,
    SiJest,
    SiDocker,
    SiGit,
    SiPostman,
    SiWhatsapp
} from 'react-icons/si';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import AnimatedLogo from '../components/AnimatedLogo';

const PortfolioPage = () => {
    const heroRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const experienceRef = useRef(null);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Add smoothing to the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothedX = useSpring(mouseX, springConfig);
    const smoothedY = useSpring(mouseY, springConfig);

    const [imageError, setImageError] = useState(false);
    const [orbSize, setOrbSize] = useState(400);
    const [orbOffset, setOrbOffset] = useState(200);

    useEffect(() => {
        const initPosition = () => {
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        };
        initPosition();

        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setOrbSize(400);
                setOrbOffset(200);
            } else if (width < 1024) {
                setOrbSize(600);
                setOrbOffset(300);
            } else {
                setOrbSize(800);
                setOrbOffset(400);
            }

            mouseX.set(Math.min(mouseX.get(), window.innerWidth));
            mouseY.set(Math.min(mouseY.get(), window.innerHeight));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
    const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
    const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
    const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 });

    const techStack = [
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
        { name: 'Express.js', icon: SiExpress, color: 'text-gray-200' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#336791]' },
        { name: 'MySQL', icon: SiMysql, color: 'text-[#4479A1]' },
        { name: 'Redis', icon: SiRedis, color: 'text-[#DC382D]' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
        { name: 'Jest', icon: SiJest, color: 'text-[#C21325]' },
        { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
        { name: 'Git', icon: SiGit, color: 'text-[#F05032]' },
        { name: 'Postman', icon: SiPostman, color: 'text-[#FF6C37]' },
        { name: 'Paystack', icon: Code2, color: 'text-[#00B9F5]' },
    ];

    const projects = [
        {
            name: 'ReForge',
            description: 'Rebuild Your Muscle. Regain Your Control. A 30-Day coding challenge platform designed to help developers rebuild their engineering intuition through pure, rigorous practice. No shortcuts. No prompts. Just you and the code.',
            tech: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'BullMQ', 'React', 'Vite'],
            github: 'https://github.com/successamust/ReForge',
            live: 'https://reforge-xi.vercel.app/',
            image: '/reforge-preview.png',
            featured: true,
            highlights: ['30-Day Algorithm Challenge', 'Isolated Execution Environments', 'Anti-Cheat Mechanics', 'Real-time Progress Tracking']
        },
        {
            name: 'Nexus Blog',
            description: 'A modern blog and newsletter PWA with full backend API, authentication, newsletter management, and real-time features. Complete full-stack solution with optimized performance.',
            tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'React', 'Vite'],
            github: 'https://github.com/successamust/Blog-Management',
            live: 'https://nexusblog.xyz',
            image: '/nexus-og-image.svg', // Placeholder
            featured: true,
            highlights: ['RESTful API', 'Authentication', 'Newsletter System', 'Real-time Updates']
        },
        {
            name: 'RideSync',
            description: 'Transportation booking API with integrated payment services, real-time tracking, and event scheduling. Scalable backend solution for transportation management.',
            tech: ['Node.js', 'Express.js', 'MongoDB', 'Paystack', 'WebSockets'],
            github: 'https://github.com/successamust/RideSync',
            image: '/ridesync-preview.png',
            featured: true,
            highlights: ['Payment Integration', 'Real-time Tracking', 'Booking System', 'Event Scheduling']
        }
    ];

    const experiences = [
        {
            role: 'Backend Engineer',
            company: 'Everything Mobile Tech-Hub Ltd',
            location: 'Lagos, Nigeria',
            period: 'May 2025 – Present',
            type: 'Remote',
            achievements: [
                'Built resilient RESTful APIs serving thousands of users',
                'Optimized database queries, achieving 50% improvement in API response time',
                'Architected microservices for enhanced scalability',
                'Implemented secure authentication with JWT & OAuth2',
                'Integrated payment gateways and wallet systems',
                'Mentored junior developers and maintained code quality standards'
            ]
        }
    ];

    const phoneNumber = '+2348167775155';
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
    const cvLink = 'https://drive.google.com/file/d/1TjQ5CzleJsqojH5IkqxsrpKZJwuvjF9X/view?usp=sharing';

    const nextProject = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
            } else if (e.key === 'ArrowRight') {
                setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [projects.length]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <SEO
                title="Fatai Salami - Backend Engineer"
                description="Backend Engineer specializing in Node.js, Express.js, MongoDB, and microservices. Building scalable APIs and robust backend systems."
            />
            <div
                className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-white selection:text-black"
                onMouseMove={(e) => {
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                }}
                onMouseLeave={() => {
                    mouseX.set(window.innerWidth / 2);
                    mouseY.set(window.innerHeight / 2);
                }}
            >
                {/* Global Aesthetics */}
                <div className="noise" />

                {/* Dynamic Background Orb */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: orbSize,
                            height: orbSize,
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
                            filter: 'blur(120px)',
                            willChange: 'transform',
                            x: useTransform(smoothedX, (val) => val - orbOffset),
                            y: useTransform(smoothedY, (val) => val - orbOffset),
                        }}
                    ></motion.div>
                </div>

                {/* Hero Section */}
                <section
                    ref={heroRef}
                    id="hero"
                    className="relative pt-32 pb-20 px-6 lg:px-12 min-h-screen flex items-center"
                >
                    <div className="max-w-7xl mx-auto w-full relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="space-y-8 order-2 lg:order-1"
                            >
                                <div className="space-y-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-black text-white/40"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        System Active / Backend Phase
                                    </motion.div>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.8] mb-4">
                                        FATAI <br />
                                        <span
                                            className="text-white/20 glitch-effect inline-block hover:text-white/80 transition-all duration-300 cursor-default"
                                            data-text="SALAMI"
                                        >
                                            SALAMI
                                        </span>
                                    </h1>
                                </div>

                                <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-lg">
                                    Crafting high-integrity backends. Specializing in <span className="text-white">Node.js</span>, <span className="text-white">Distributed Systems</span>, and <span className="text-white">Scalable Architecture</span>.
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => window.open(cvLink, '_blank')}
                                        className="min-w-[180px]"
                                    >
                                        <FileText size={18} />
                                        Access Resume
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {[
                                            { href: "https://www.github.com/successamust", icon: Github },
                                            { href: "https://www.linkedin.com/in/fataiopeyemi", icon: Linkedin },
                                            { href: whatsappLink, icon: SiWhatsapp },
                                            { href: "mailto:fosalami1@gmail.com", icon: Mail }
                                        ].map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                                            >
                                                <social.icon size={20} />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Location</span>
                                        <span className="text-sm font-bold flex items-center gap-2">
                                            <MapPin size={12} className="text-white/40" />
                                            Lagos, NG
                                        </span>
                                    </div>
                                    <div className="w-px h-8 bg-white/5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Status</span>
                                        <span className="text-sm font-bold text-green-500">Available</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Image / Visual */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="order-1 lg:order-2 flex justify-center lg:justify-end"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full transition-all group-hover:bg-white/10" />
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border border-white/10 p-4">
                                        <div className="w-full h-full border border-white/5 overflow-hidden">
                                            {!imageError ? (
                                                <img
                                                    src="/profile-photo.jpg"
                                                    alt="Fatai Salami Profile"
                                                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                                                    onError={() => setImageError(true)}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                    <span className="text-8xl font-black text-white/5 italic">FS</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* HUD Decorations */}
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 translate-x-1/2 -translate-y-1/2" />
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 -translate-x-1/2 translate-y-1/2" />

                                        <motion.div
                                            className="absolute -bottom-6 -right-6 py-2 px-4 bg-white text-black font-black text-xs tracking-widest uppercase shadow-2xl"
                                            animate={{
                                                y: [0, -8, 0],
                                                rotate: [2, -1, 2]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            style={{ willChange: "transform" }}
                                        >
                                            BACKEND//ENGINEER
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 px-6 border-y border-white/5 relative bg-white/[0.01]">
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">The Narrative</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Beyond The <span className="text-white/40 italic">Endpoints</span></h2>
                            <div className="space-y-4 text-white/60 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                                <p>
                                    I don't just write code; I architect systems that endure. Specializing in Node.js and MongoDB, I build the engines that power modern digital experiences.
                                </p>
                                <p>
                                    My approach is rooted in technical rigor and engineering intuition. Whether it's optimizing database throughput or designing fault-tolerant microservices, I focus on performance, security, and scalability.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => scrollToSection('projects')}
                                className="mt-8 border-white/10 hover:border-white/40"
                            >
                                Inspect Portfolio
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Projects */}
                <section id="projects" ref={projectsRef} className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Registry</span>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Selected Artifacts</h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevProject}
                                    className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/40 transition-all active:bg-white active:text-black"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/40 transition-all active:bg-white active:text-black"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProjectIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="glass border-white/5 p-4 md:p-12"
                            >
                                <div className="grid lg:grid-cols-12 gap-12 items-start">
                                    <div className="lg:col-span-7 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-4xl md:text-5xl font-black tracking-tight">{projects[currentProjectIndex].name}</h3>
                                                {projects[currentProjectIndex].featured && (
                                                    <span className="px-2 py-0.5 bg-white text-black text-[8px] font-black uppercase tracking-widest">High Impact</span>
                                                )}
                                            </div>
                                            <p className="text-xl text-white/60 font-medium leading-relaxed">
                                                {projects[currentProjectIndex].description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {projects[currentProjectIndex].tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest font-black text-white/40">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Operational Highlights</span>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {projects[currentProjectIndex].highlights.map((h, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/40">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                        {h}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            {projects[currentProjectIndex].live ? (
                                                <Button
                                                    variant="primary"
                                                    onClick={() => window.open(projects[currentProjectIndex].live, '_blank')}
                                                    className="flex-1 md:flex-none"
                                                >
                                                    <Globe size={16} /> Live Access
                                                </Button>
                                            ) : (
                                                <div className="flex-1 md:flex-none flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/20 text-sm font-black uppercase tracking-widest cursor-not-allowed">
                                                    <Server size={16} /> API ONLY
                                                </div>
                                            )}
                                            <Button
                                                variant="secondary"
                                                onClick={() => window.open(projects[currentProjectIndex].github, '_blank')}
                                                className="flex-1 md:flex-none"
                                            >
                                                <Github size={16} /> Source Code
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-5 relative group">
                                        <div className="aspect-[4/3] border border-white/10 overflow-hidden bg-black flex items-center justify-center p-4">
                                            {projects[currentProjectIndex].image ? (
                                                <img
                                                    src={projects[currentProjectIndex].image}
                                                    alt={projects[currentProjectIndex].name}
                                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-4 opacity-10">
                                                    <Terminal size={64} />
                                                    <span className="text-2xl font-black italic">ENCRYPTED</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 border border-white/10 pointer-events-none group-hover:border-white/20 transition-all translate-x-3 translate-y-3 -z-10" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* Tech Stack Horizontal Scroll/Grid */}
                <section id="skills" ref={skillsRef} className="py-24 bg-white/[0.01] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Operational Stack</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Core Technologies</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/5 border border-white/5">
                            {techStack.map((tech, i) => {
                                const Icon = tech.icon;
                                return (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-black p-8 flex flex-col items-center gap-4 group hover:bg-white/5 transition-all cursor-crosshair"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center text-white/40 group-hover:text-white transition-all transform group-hover:scale-110">
                                            <Icon size={32} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-all">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section id="experience" ref={experienceRef} className="py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-2 mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Timeline</span>
                            <h2 className="text-5xl font-black tracking-tighter">Field Operations</h2>
                        </div>

                        <div className="space-y-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l border-white/10"
                                >
                                    <div className="absolute left-0 top-0 w-3 h-3 bg-white -translate-x-[7px] border-4 border-black" />

                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-black tracking-tight">{exp.role}</h3>
                                                <div className="flex items-center gap-2 text-white/40 font-bold uppercase text-xs tracking-widest">
                                                    <Briefcase size={14} className="text-white/20" />
                                                    {exp.company}
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right space-y-1">
                                                <div className="text-xs font-black uppercase tracking-[0.2em]">{exp.period}</div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{exp.location} // {exp.type}</div>
                                            </div>
                                        </div>

                                        <ul className="space-y-3">
                                            {exp.achievements.map((a, idx) => (
                                                <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 hover:border-white/10 transition-all font-medium text-white/60">
                                                    <div className="w-1 h-1 rounded-full bg-white/20 mt-2.5 flex-shrink-0" />
                                                    <span className="text-sm md:text-base">{a}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact/CTA */}
                <section id="contact" className="py-32 px-6 bg-white text-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Transmission</span>
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8]">ESTABLISH <br /> CONTACT</h2>
                                </div>
                                <p className="text-xl font-bold leading-relaxed max-w-md opacity-70">
                                    I'm currently accepting new opportunities for complex backend systems and technical leadership. Send a secure transmission.
                                </p>
                            </div>

                            <div className="flex flex-col gap-8">
                                <a
                                    href="mailto:fosalami1@gmail.com"
                                    className="text-4xl md:text-5xl font-black tracking-tighter hover:italic transition-all break-all"
                                >
                                    FOSALAMI1@GMAIL.COM
                                </a>

                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: "GITHUB", href: "https://www.github.com/successamust" },
                                        { name: "LINKEDIN", href: "https://www.linkedin.com/in/fataiopeyemi" },
                                        { name: "WHATSAPP", href: whatsappLink }
                                    ].map(link => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 border-2 border-black font-black text-xs tracking-widest hover:bg-black hover:text-white transition-all"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section Style */}
                <section className="py-12 border-t border-white/10 bg-black">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-8">
                            <AnimatedLogo />
                            <div className="w-px h-8 bg-white/5 hidden md:block" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                &copy; 2025 FS // SYSTEM VER. 4.2.0-STABLE
                            </span>
                        </div>
                        <div className="flex gap-8">
                            <button onClick={() => scrollToSection('hero')} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Back To Top</button>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Design By ReForge-Core</span>
                        </div>
                    </div>
                </section>

            </div >
        </>
    );
};

export default PortfolioPage;

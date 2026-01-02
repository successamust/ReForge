import React, { useContext } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const NexusCore = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 60, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.nexus-container')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (e.clientX - rect.left - centerX) / centerX;
        const deltaY = (e.clientY - rect.top - centerY) / centerY;
        mouseX.set(deltaX * 20);
        mouseY.set(deltaY * 20);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="nexus-container relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="100"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="0.5"
              />
            </g>
          ))}
        </svg>
      </div>

      {[...Array(6)].map((_, i) => (
        <GeometricShape key={i} index={i} x={x} y={y} />
      ))}

      {[...Array(12)].map((_, i) => (
        <GeometricDot key={i} index={i} x={x} y={y} />
      ))}
    </div>
  );
};

const GeometricShape = ({ index, x, y }) => {
  const angle = (index / 6) * Math.PI * 2;
  const radius = 200 + index * 50;
  const xTransform = useTransform(x, (v) => v * (index % 2 === 0 ? 0.3 : -0.2));
  const yTransform = useTransform(y, (v) => v * (index % 2 === 0 ? 0.2 : -0.3));

  return (
    <motion.div
      className="absolute border border-white/5"
      style={{
        left: '50%',
        top: '50%',
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: 'translate(-50%, -50%)',
        borderRadius: index % 2 === 0 ? '50%' : '0%',
        rotate: angle * (180 / Math.PI),
        x: xTransform,
        y: yTransform,
      }}
      animate={{
        rotate: [0, 360],
        opacity: [0.05, 0.1, 0.05],
      }}
      transition={{
        rotate: {
          duration: 40 + index * 10,
          repeat: Infinity,
          ease: "linear"
        },
        opacity: {
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
  );
};

const GeometricDot = ({ index, x, y }) => {
  const angle = (index / 12) * Math.PI * 2;
  const radius = 300;
  const xTransform = useTransform(x, (v) => Math.cos(angle) * radius + v * 0.5);
  const yTransform = useTransform(y, (v) => Math.sin(angle) * radius + v * 0.5);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        left: '50%',
        top: '50%',
        x: xTransform,
        y: yTransform,
      }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + index * 0.3,
        repeat: Infinity,
        delay: index * 0.2,
        ease: "easeInOut"
      }}
    />
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { startSession, isSessionActive, isAuthenticated } = useContext(AppContext);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  const handleInitiateDetox = () => {
    if (isAuthenticated) {
      startSession();
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden select-none">
      <motion.div
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <NexusCore />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
            className="flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-none" />
                <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                  30-Day Challenge
                </span>
              </div>
            </motion.div>

            <div className="mb-8 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-4"
              >
                Rebuild
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.02em] text-white"
              >
                Your Muscle
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl mb-12"
            >
              <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light tracking-wide">
                Rediscover the joy of the craft. Whether you're breaking free from AI reliance or reigniting a lost passion, rebuild your engineering intuition through pure, rigorous practice. No shortcuts. No prompts. Just you and the code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={handleInitiateDetox}
                disabled={isSessionActive}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10">{isSessionActive ? 'Session Active' : isAuthenticated ? 'Continue' : 'Start Challenge'}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.button>

              <Link to="/lessons">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-widest bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all"
                >
                  View Curriculum
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-wrap gap-12"
            >
              {[
                { label: 'Days', value: '30' },
                { label: 'Languages', value: '5' },
                { label: 'Lessons', value: '150+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
                    {stat.label}
                  </div>
                  <div className="text-white text-3xl font-black tracking-tight">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-white/20" />
          <div className="w-1 h-1 bg-white/40 rounded-none" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

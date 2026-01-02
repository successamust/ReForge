import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const companies = [
    "NEURALINK", "GOOGLE", "META", "NVIDIA", "PALANTIR", "STRIKE", "SPACE-X", "KERNEL"
];

const SocialProof = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={ref} className="py-24 bg-black border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <p className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase text-center font-bold">
                    Engineering Standards Aligned With
                </p>
            </div>

            <div className="flex flex-col gap-8 opacity-40">
                <motion.div
                    style={{ x: x1 }}
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...companies, ...companies].map((company, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black tracking-tighter text-white/50 grayscale">
                            {company}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    style={{ x: x2 }}
                    className="flex gap-16 whitespace-nowrap ml-[-200px]"
                >
                    {[...companies, ...companies].map((company, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black tracking-tighter text-white/50 grayscale">
                            {company}
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-16 max-w-4xl text-center">
                <p className="text-white/40 font-light italic leading-relaxed">
                    "True mastery isn't about rejecting AI. It's about transcending it.
                    You can only harness its full potential when you deeply understand every line you command."
                </p>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="block w-8 h-px bg-white/10"></span>
                    <span className="text-white font-mono text-[10px] not-italic font-bold uppercase tracking-widest">
                        The ReForge Manifesto
                    </span>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;

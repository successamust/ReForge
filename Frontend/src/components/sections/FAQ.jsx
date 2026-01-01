import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const faqs = [
    {
        question: "What makes the ReForge protocol unique?",
        answer: "ReForge is a 'Developer Rehabilitation' system designed to rebuild core coding intuition. Unlike traditional environments that provide hints and auto-complete, we emphasize pure, manual algorithm reconstruction. Our 30-day curriculum is built to help you master high-performance patterns and regain the deep logic flow that modern automated tooling often obscures."
    },
    {
        question: "Do I need prior programming experience?",
        answer: "Yes. ReForge is designed for developers who already know the basics but want to level up. We assume you're comfortable with at least one programming language and understand fundamental concepts like loops, functions, and data structures. This is advanced technical training."
    },
    {
        question: "What programming languages are supported?",
        answer: "Currently, we support 5 primary tracks: Python, JavaScript, Go, Java, and C#. Each language has a complete 30-day curriculum with progressively challenging exercises. You can switch between languages or complete multiple tracks to broaden your expertise."
    },
    {
        question: "How long does it take to complete a track?",
        answer: "Each language track is designed as a 30-day challenge, with one lesson per day. Most lessons take 30:60 minutes to complete, depending on your skill level. You can go at your own pace. There's no penalty for taking longer, but consistency is key to building muscle memory."
    },
    {
        question: "Is there a free tier?",
        answer: "Currently, ReForge is in active beta. All full 30-day curriculum tracks, advanced metrics, and premium features are diagnostic-free and totally unlocked for all users. Rebuild your intuition without constraints during this protocol phase."
    },
    {
        question: "What happens if I miss a day?",
        answer: "Your progress is saved and you can pick up where you left off. However, your streak counter will reset, which affects your leaderboard ranking. The platform is designed to encourage daily practice, but we understand if life gets in the way."
    },
    {
        question: "Can I compete with other developers?",
        answer: "Absolutely. The global leaderboard ranks users based on completion rate, accuracy, and consistency. You can see how you stack up against developers worldwide. Premium users also get access to detailed analytics comparing their performance to the top 10%."
    },
    {
        question: "Do you provide certificates?",
        answer: "Yes. Upon completing a 30-day track with at least 80% accuracy, you'll receive a digital certificate. Premium users can download a professional PDF certificate to add to their LinkedIn or portfolio. These represent verified skill development."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={ref} className="relative py-40 bg-black overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <motion.div
                    style={{ y, opacity }}
                    className="mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-white rounded-none" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            Frequently Asked
                        </span>
                    </div>
                    <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        Questions
                    </h2>
                    <p className="text-white/60 text-lg font-light">
                        Everything you need to know about the platform
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-px bg-white/5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-black border-b border-white/10 last:border-b-0"
                            >
                                {/* Question */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors group"
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <span className="text-white/20 font-mono text-sm font-bold min-w-[3ch]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-white font-bold text-lg tracking-tight">
                                            {faq.question}
                                        </span>
                                    </div>

                                    {/* Toggle Icon */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-4"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="text-white/40 group-hover:text-white transition-colors"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" />
                                            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </motion.div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6 pl-[5.5rem]">
                                                <p className="text-white/60 leading-relaxed font-light">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/40 text-sm font-mono mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:support@reforge.dev"
                        className="text-white font-bold hover:text-white/80 transition-colors inline-flex items-center gap-2"
                    >
                        Contact Support
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const Pricing = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const tiers = [
        {
            name: "Free Tier",
            price: "$0",
            duration: "Forever",
            desc: "The basic calibration pack for aspiring engineers.",
            features: [
                "First 7 Days of Any Track",
                "Global Leaderboard Access",
                "Basic Progress Tracking",
                "Community Discord Access"
            ],
            buttonText: "Start Training",
            variant: "ghost"
        },
        {
            name: "Premium Protocol",
            price: "$29",
            duration: "Monthly",
            desc: "The complete manual reconstruction kit.",
            features: [
                "Full 30-Day Curriculum",
                "Advanced Performance Metrics",
                "Digital Certificates",
                "Priority Support",
                "No Failure Timeouts",
                "Unlimited Reruns"
            ],
            buttonText: "Activate Protocol",
            variant: "primary",
            highlight: true
        }
    ];

    return (
        <section ref={ref} className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    style={{ y, opacity }}
                    className="mb-24 text-center"
                >
                    <Badge variant="primary" className="mb-4">Service Tiers</Badge>
                    <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6 uppercase">
                        Choose Your <br /> Protocol
                    </h2>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Beta Access Banner */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="bg-white text-black px-8 py-4 font-black uppercase tracking-[0.3em] text-sm animate-pulse border-4 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            All courses are totally free for now
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 grayscale opacity-40 select-none">
                        {tiers.map((tier, i) => (
                            <div key={i} className={`bg-black p-12 flex flex-col justify-between relative ${tier.highlight ? 'z-10 bg-white/[0.02]' : ''}`}>
                                {tier.highlight && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-white" />
                                )}
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
                                            {tier.name}
                                        </h3>
                                        {tier.highlight && (
                                            <Badge variant="primary" className="text-[8px]">Standard Tier</Badge>
                                        )}
                                    </div>

                                    <div className="mb-12">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-6xl font-black text-white">{tier.price}</span>
                                            <span className="text-white/20 font-mono text-sm uppercase">/ {tier.duration}</span>
                                        </div>
                                        <p className="text-white/60 font-light text-sm italic">
                                            {tier.desc}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-12">
                                        {tier.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm">
                                                <div className="w-1.5 h-1.5 bg-white flex-shrink-0" />
                                                <span className="text-white/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    variant={tier.variant}
                                    className="w-full h-14 uppercase tracking-[0.2em] font-black text-[10px] cursor-not-allowed"
                                    size="lg"
                                    disabled
                                >
                                    {tier.buttonText}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
                            * Early Access protocol grants full access to all 30-day curriculum modules
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;

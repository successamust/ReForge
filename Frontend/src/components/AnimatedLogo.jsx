import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_TEXT = "Forge";
const FORGE_LETTERS = TARGET_TEXT.split('');
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const AnimatedLogo = () => {
    // Add state to track hover
    const [isHovered, setIsHovered] = useState(false);

    const targetIndices = FORGE_LETTERS.map(l => GLYPHS.indexOf(l));
    const maxTargetIndex = Math.max(...targetIndices);

    // Animation state
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isHovered) {
            // Reset to start
            setTimeout(() => setCurrentIndex(0), 0);

            // Animate all letters together
            const interval = setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev < maxTargetIndex) {
                        return prev + 1;
                    } else {
                        // Reached max, keep it there
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 30); // Faster animation speed

            return () => {
                clearInterval(interval);
            };
        } else {
            // Instantly reset when mouse leaves
            setTimeout(() => setCurrentIndex(0), 0);
        }
    }, [isHovered, maxTargetIndex]);

    // Get display character for each letter
    const getDisplayChar = (originalLetter, index) => {
        if (!isHovered) {
            return originalLetter; // Normal state
        }

        const targetIndex = targetIndices[index];

        // Show current letter in alphabet cycle, but only up to its target
        if (currentIndex <= targetIndex) {
            const char = GLYPHS[currentIndex] || originalLetter;
            // Capitalize if original was uppercase
            return originalLetter === originalLetter.toUpperCase() ? char.toUpperCase() : char;
        } else {
            // Already reached target, show target letter
            const char = GLYPHS[targetIndex] || originalLetter;
            return originalLetter === originalLetter.toUpperCase() ? char.toUpperCase() : char;
        }
    };

    return (
        <div
            className="relative inline-flex items-center gap-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Re part - always static */}
            <span className="text-white font-black tracking-tighter text-xl leading-none">
                Re
            </span>

            {/* Forge part - alphabet cycling animation */}
            <span className="relative inline-flex">
                {FORGE_LETTERS.map((letter, i) => {
                    const displayChar = getDisplayChar(letter, i);

                    return (
                        <motion.span
                            key={i}
                            className="inline-block font-black tracking-tighter text-xl font-mono"
                            animate={{
                                color: '#ffffff',
                            }}
                            transition={{
                                duration: 0.05,
                            }}
                        >
                            {displayChar}
                        </motion.span>
                    );
                })}
            </span>

            {/* Blinking underscore at the back */}
            <motion.span
                className="text-white font-mono text-xl ml-0.5"
                animate={{
                    opacity: [1, 0, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                _
            </motion.span>
        </div>
    );
};

export default AnimatedLogo;

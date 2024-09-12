'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Cloud, Zap, Music,
    Sun, Moon, Coffee, Flame,
    Wind,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import CentralBox from './components/CentralBox';

interface Mood {
    name: string;
    color: string;
    hoverColor: string;
    icon: React.ElementType;
}

const moods: Mood[] = [
    { name: 'Energetic', color: 'from-red-400/50 to-red-500/50', hoverColor: 'from-red-400/70 to-red-500/70', icon: Zap },
    { name: 'Calm', color: 'from-blue-400/50 to-blue-500/50', hoverColor: 'from-blue-400/70 to-blue-500/70', icon: Cloud },
    { name: 'Happy', color: 'from-yellow-400/50 to-yellow-500/50', hoverColor: 'from-yellow-400/70 to-yellow-500/70', icon: Sun },
    { name: 'Melancholy', color: 'from-purple-400/50 to-purple-500/50', hoverColor: 'from-purple-400/70 to-purple-500/70', icon: Moon },
    { name: 'Focused', color: 'from-green-400/50 to-green-500/50', hoverColor: 'from-green-400/70 to-green-500/70', icon: Coffee },
    { name: 'Romantic', color: 'from-pink-400/50 to-pink-500/50', hoverColor: 'from-pink-400/70 to-pink-500/70', icon: Heart },
    { name: 'Relaxed', color: 'from-teal-400/50 to-teal-500/50', hoverColor: 'from-teal-400/70 to-teal-500/70', icon: Music },
    { name: 'Pumped', color: 'from-orange-400/50 to-orange-500/50', hoverColor: 'from-orange-400/70 to-orange-500/70', icon: Flame },
    { name: 'Chill', color: 'from-indigo-400/50 to-indigo-500/50', hoverColor: 'from-indigo-400/70 to-indigo-500/70', icon: Wind },
];

const MoodBox: React.FC<{ mood: Mood; className?: string }> = ({ mood, className }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
    >
        <Link href={`/mood/${mood.name.toLowerCase()}`} className={`w-full h-full ${className}`}>
            <motion.div
                className={`bg-gradient-to-br ${mood.color} backdrop-filter backdrop-blur-sm w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden relative border border-white/20`}
                whileHover={{
                    backgroundImage: `linear-gradient(to bottom right, ${mood.hoverColor.split(' ')[1]}, ${mood.hoverColor.split(' ')[3]})`,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    <mood.icon size={200} />
                </motion.div>
                <mood.icon size={40} className="mb-2 text-white" />
                <span className="text-white font-bold text-4xl font-attraction drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{mood.name}</span>
            </motion.div>
        </Link>
    </motion.div>
);

export default function Home() {
    const [user] = useAuthState(auth);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const isFirstVisit = !localStorage.getItem('hasVisited');
        if (isFirstVisit) {
            setShowOnboarding(true);
            localStorage.setItem('hasVisited', 'true');
        }

        // Trigger the animation after a short delay
        const timer = setTimeout(() => setIsInitialLoad(false), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-attraction p-6">
            <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full h-[calc(100vh-3rem)]">
                {moods.map((mood, index) => (
                    <React.Fragment key={mood.name}>
                        {index === 4 ? (
                            <motion.div
                                className="col-span-1 row-span-1"
                                initial={isInitialLoad ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 } : {}}
                                animate={isInitialLoad ? {} : { position: 'relative', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto', zIndex: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <CentralBox user={user} isInitialLoad={isInitialLoad} />
                            </motion.div>
                        ) : (
                            <MoodBox mood={mood} className="scale-95" />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <AnimatePresence>
                {showOnboarding && (
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white text-black p-6 rounded-lg max-w-md"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold mb-4 font-attraction">Welcome to FeelTunes!</h2>
                            <p className="mb-4 font-attraction">Discover music that matches your mood. Click on a mood to get started!</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded font-attraction"
                                onClick={() => setShowOnboarding(false)}
                            >
                                Got it!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
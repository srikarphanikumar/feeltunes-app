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
import { User as FirebaseUser } from 'firebase/auth';

interface Mood {
    name: string;
    color: string;
    icon: React.ElementType;
}

const moods: Mood[] = [
    { name: 'Energetic', color: 'from-red-400/50 to-red-500/50', icon: Zap },
    { name: 'Calm', color: 'from-blue-400/50 to-blue-500/50', icon: Cloud },
    { name: 'Happy', color: 'from-yellow-400/50 to-yellow-500/50', icon: Sun },
    { name: 'Melancholy', color: 'from-purple-400/50 to-purple-500/50', icon: Moon },
    { name: 'Focused', color: 'from-green-400/50 to-green-500/50', icon: Coffee },
    { name: 'Romantic', color: 'from-pink-400/50 to-pink-500/50', icon: Heart },
    { name: 'Chill', color: 'from-indigo-400/50 to-indigo-500/50', icon: Wind },
    { name: 'Pumped', color: 'from-orange-400/50 to-orange-500/50', icon: Flame },
    { name: 'Relaxed', color: 'from-teal-400/50 to-teal-500/50', icon: Music },
];

const MoodBox: React.FC<{ mood: Mood }> = ({ mood }) => (
    <Link href={`/mood/${mood.name.toLowerCase()}`} className="w-full h-full">
        <motion.div
            className={`bg-gradient-to-br ${mood.color} backdrop-filter backdrop-blur-sm w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden relative border border-white/20`}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                <mood.icon size={200} />
            </motion.div>
            <mood.icon size={40} className="mb-2 text-white" />
            <span className="text-white font-bold text-xl">{mood.name}</span>
        </motion.div>
    </Link>
);

export default function Home() {
    const [user] = useAuthState(auth);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const isFirstVisit = !localStorage.getItem('hasVisited');
        if (isFirstVisit) {
            setShowOnboarding(true);
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    return (
        <main className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-6">
            <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full h-[calc(100vh-3rem)]">
                {moods.map((mood, index) => (
                    <React.Fragment key={mood.name}>
                        {index === 4 ? (
                            <div className="col-span-1 row-span-1">
                                <CentralBox user={user} />
                            </div>
                        ) : (
                            <MoodBox mood={mood} />
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
                            <h2 className="text-2xl font-bold mb-4">Welcome to FeelTunes!</h2>
                            <p className="mb-4">Discover music that matches your mood. Click on a mood to get started!</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
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
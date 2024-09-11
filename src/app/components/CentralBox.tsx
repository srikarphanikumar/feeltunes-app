'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Share2, Shuffle, LogIn } from 'lucide-react';
import Tooltip from './Tooltip';
import { User as FirebaseUser } from 'firebase/auth';

interface CentralBoxProps {
    user: FirebaseUser | null | undefined;
}

const CentralBox: React.FC<CentralBoxProps> = ({ user }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="relative bg-gradient-to-br from-indigo-500/70 via-purple-500/70 to-pink-500/70 backdrop-filter backdrop-blur-md rounded-xl w-full h-full flex flex-col items-center justify-between p-6 shadow-xl overflow-hidden border border-white/20"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <motion.div className="flex items-center space-x-4 z-10">
                <Tooltip content="Search">
                    <Search className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                </Tooltip>
                <Tooltip content="Notifications">
                    <Bell className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                </Tooltip>
            </motion.div>

            <motion.h1
                className="text-5xl font-extrabold text-white text-center z-10"
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
                Feel
                {/* <br /> */}
                Tunes
            </motion.h1>

            <motion.div className="flex items-center space-x-4 z-10">
                <Tooltip content="Share">
                    <Share2 className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                </Tooltip>
                <Tooltip content="Shuffle">
                    <Shuffle className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                </Tooltip>
                {user ? (
                    <Tooltip content="Profile">
                        <img
                            src={user.photoURL || '/default-avatar.png'}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:border-indigo-200"
                        />
                    </Tooltip>
                ) : (
                    <Tooltip content="Login">
                        <LogIn className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                    </Tooltip>
                )}
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <input
                            type="text"
                            placeholder="Search moods or playlists..."
                            className="bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white mb-4 w-3/4"
                        />
                        <div className="flex space-x-4 mb-4">
                            <button className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30">
                                Profile
                            </button>
                            <button className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30">
                                Settings
                            </button>
                        </div>
                        <p className="text-white/80 text-sm">Click anywhere to close</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CentralBox;
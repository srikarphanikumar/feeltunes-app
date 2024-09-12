import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Share2, Shuffle, LogIn } from 'lucide-react';
import Tooltip from './Tooltip';
import { User as FirebaseUser } from 'firebase/auth';
import Image from 'next/image';

interface CentralBoxProps {
    user: FirebaseUser | null | undefined;
    isInitialLoad: boolean;
}

const CentralBox: React.FC<CentralBoxProps> = ({ user, isInitialLoad }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="relative bg-black rounded-xl w-full h-full flex flex-col items-center justify-center shadow-xl overflow-hidden border border-white/20"
            initial={isInitialLoad ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="absolute top-4 right-4 flex flex-col items-end z-10">
                <div className="flex space-x-4 mb-4">
                    {user ? (
                        <Tooltip content="Profile">
                            <Image
                                src={user.photoURL || '/default-avatar.png'}
                                alt="User"
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white cursor-pointer hover:border-indigo-200"
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip content="Login">
                            <LogIn className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                        </Tooltip>
                    )}
                    <Tooltip content="Search">
                        <Search className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                    </Tooltip>
                    <Tooltip content="Notifications">
                        <Bell className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                    </Tooltip>
                </div>
                <div className="flex flex-col items-end space-y-4">
                    <Tooltip content="Shuffle">
                        <Shuffle className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                    </Tooltip>
                    <Tooltip content="Share">
                        <Share2 className="text-white cursor-pointer hover:text-indigo-200" size={24} />
                    </Tooltip>
                </div>
            </div>

            <motion.div
                className="text-center z-10"
                initial={isInitialLoad ? { scale: 1.5 } : { scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
                <h1 className="font-tomatoes font-normal text-white text-6xl mb-2 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]">Feel Tunes</h1>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute font-bold inset-0 bg-black backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center z-20"
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
                            <button className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 font-tomatoes">
                                Profile
                            </button>
                            <button className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 font-tomatoes">
                                Settings
                            </button>
                        </div>
                        <p className="text-white/80 text-sm font-tomatoes">Click anywhere to close</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CentralBox;
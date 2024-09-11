'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Heart, Clock } from 'lucide-react';

const playlists = [
    { id: 1, name: "Top Hits", songs: 50, image: "/api/placeholder/200/200" },
    { id: 2, name: "Chill Vibes", songs: 40, image: "/api/placeholder/200/200" },
    { id: 3, name: "Workout Mix", songs: 35, image: "/api/placeholder/200/200" },
    { id: 4, name: "Focus Flow", songs: 45, image: "/api/placeholder/200/200" },
];

const songs = [
    { id: 1, name: "Song 1", artist: "Artist 1", duration: "3:30" },
    { id: 2, name: "Song 2", artist: "Artist 2", duration: "4:15" },
    { id: 3, name: "Song 3", artist: "Artist 3", duration: "3:45" },
    { id: 4, name: "Song 4", artist: "Artist 4", duration: "3:20" },
    { id: 5, name: "Song 5", artist: "Artist 5", duration: "4:00" },
];

export default function MoodPage({ params }: { params: { mood: string } }) {
    const mood = params.mood.charAt(0).toUpperCase() + params.mood.slice(1);

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white p-8">
            <Link href="/" className="flex items-center text-gray-300 hover:text-white mb-8">
                <ArrowLeft className="mr-2" /> Back to Moods
            </Link>

            <h1 className="text-4xl font-bold mb-8">{mood} Mood</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Featured Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="bg-gray-800 p-4 rounded-lg">
                            <img src={playlist.image} alt={playlist.name} className="w-full h-40 object-cover rounded-md mb-2" />
                            <h3 className="font-semibold">{playlist.name}</h3>
                            <p className="text-sm text-gray-400">{playlist.songs} songs</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Top Songs</h2>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    {songs.map((song, index) => (
                        <div key={song.id} className="flex items-center p-4 hover:bg-gray-700">
                            <div className="w-8 text-center text-gray-400">{index + 1}</div>
                            <div className="flex-grow ml-4">
                                <div className="font-semibold">{song.name}</div>
                                <div className="text-sm text-gray-400">{song.artist}</div>
                            </div>
                            <div className="flex items-center">
                                <Heart className="w-5 h-5 text-gray-400 hover:text-white mr-4 cursor-pointer" />
                                <div className="text-sm text-gray-400 mr-4">{song.duration}</div>
                                <Play className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
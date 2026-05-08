import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import StoryCard from '../components/StoryCard';

const Home = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    // Fetch stories

    const fetchStories = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/stories?page=${page}&limit=10`);
            setStories(response.data.data);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [page]);

    return (
        <div className="relative min-h-screen py-8 px-4 sm:py-12">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 sm:mb-16">
                    <div className="card-shadow-retro bg-gradient-to-br from-gray-900 to-black border-2 border-black text-white p-8 sm:p-12 rounded-xl">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl font-retro font-bold tracking-tight">
                                Hacker News Stories
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-300 font-light">
                                Curated top stories from the Hacker News community, delivered fresh.
                            </p>

                            <div className="pt-2 flex gap-2 text-sm font-mono-retro text-gray-400">
                                <span className="inline-block">[ SYSTEM ONLINE ]</span>
                                <span className="inline-block animate-pulse">●</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading && page === 1 ? (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="card-shadow-retro bg-white border-2 border-black/20 p-6 rounded-xl animate-pulse">
                                <div className="space-y-4">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="flex gap-2 pt-2">
                                        <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                        <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                        <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Story List */}
                        <div className="space-y-6 mb-10">
                            {stories.map((story) => (
                                <StoryCard
                                    key={story._id}
                                    story={story}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t-2 border-black/10">
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((prev) => prev - 1)
                                }
                                className={`btn-retro px-6 py-3 rounded-lg font-medium transition-all ${page === 1
                                        ? "bg-gray-300 text-gray-600 border-2 border-gray-300 cursor-not-allowed"
                                        : "bg-black text-white border-2 border-black hover:opacity-90"
                                    }`}
                            >
                                ← Previous
                            </button>

                            <span className="font-retro font-semibold text-lg px-6 py-3 bg-gray-100 border-2 border-black/20 rounded-lg">
                                {page} / {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
                                className={`btn-retro px-6 py-3 rounded-lg font-medium transition-all ${page === totalPages
                                        ? "bg-gray-300 text-gray-600 border-2 border-gray-300 cursor-not-allowed"
                                        : "bg-black text-white border-2 border-black hover:opacity-90"
                                    }`}
                            >
                                Next →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home
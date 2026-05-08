import { useEffect, useState } from "react";

import api from "../api/axios";

import StoryCard from "../components/StoryCard";

const Bookmarks = () => {
    const [stories, setStories] = useState([]);

    const [loading, setLoading] = useState(true);

    /**
     * Fetch Bookmarked Stories
     */
    const fetchBookmarks = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/stories/bookmarks/me",
            );

            setStories(response.data.data);
        } catch (error) {
            console.error(
                "Error fetching bookmarks:",
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch On Mount
     */
    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <div className="relative min-h-screen py-8 px-4 sm:py-12">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 sm:mb-16">
                    <div className="card-shadow-retro bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 p-8 sm:p-12 rounded-xl">
                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl font-retro font-bold text-amber-900">
                                ★ Your Bookmarks
                            </h1>

                            <p className="text-lg text-amber-800 font-light">
                                Stories saved for later reading
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="space-y-6">
                        {[...Array(2)].map((_, i) => (
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
                ) : stories.length === 0 ? (
                    <div className="card-shadow-retro bg-white border-2 border-black/20 p-12 sm:p-16 rounded-xl text-center">
                        <div className="inline-block mb-6 text-6xl">
                            ☆
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-retro font-bold text-black mb-3">
                            No Bookmarks Yet
                        </h2>

                        <p className="text-lg text-gray-600 mb-6 max-w-sm mx-auto">
                            Start exploring and bookmark stories to save them for later.
                        </p>

                        <div className="pt-4 border-t-2 border-black/10">
                            <p className="text-sm text-gray-500 font-mono-retro mt-4">
                                [ Waiting for bookmarks... ]
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {stories.map((story) => (
                            <StoryCard
                                key={story._id}
                                story={story}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
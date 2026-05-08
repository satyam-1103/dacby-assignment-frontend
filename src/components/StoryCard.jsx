import { useState } from "react";

import { toast } from "react-hot-toast";

import api from "../api/axios";

import { useAuth } from "../contexts/AuthContext";

const StoryCard = ({ story }) => {
    const { token } = useAuth();

    const [bookmarked, setBookmarked] =
        useState(false);

    const [loading, setLoading] = useState(false);

    /**
     * Toggle Bookmark
     */
    const handleBookmark = async () => {
        // User not logged in
        if (!token) {
            toast.error(
                "Please login to bookmark stories",
            );

            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                `/stories/${story._id}/bookmark`,
            );

            toast.success(response.data.message);

            setBookmarked(!bookmarked);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to toggle bookmark",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group card-lift">
            <div className="card-shadow-retro bg-white border-2 border-black/20 p-6 rounded-xl">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    {/* Title */}
                    <a
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-lg sm:text-xl font-retro font-semibold text-black hover:text-gray-700 transition-colors line-clamp-2 hover:underline"
                    >
                        {story.title}
                    </a>

                    {/* Bookmark Button */}
                    <button
                        onClick={handleBookmark}
                        disabled={loading}
                        className={`btn-retro px-4 py-2 rounded-lg text-sm font-medium font-retro transition-all flex-shrink-0 ${bookmarked
                                ? "bg-yellow-400 text-black border-2 border-black/20"
                                : "bg-black text-white border-2 border-black"
                            } disabled:opacity-50`}
                    >
                        {loading
                            ? "..."
                            : bookmarked
                                ? "★"
                                : "☆"}
                    </button>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100/80 text-orange-800 rounded-full font-medium border border-orange-200/50">
                        🔥 {story.points}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100/80 text-blue-800 rounded-full font-medium border border-blue-200/50">
                        👤 {story.author}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100/80 text-gray-800 rounded-full font-medium border border-gray-200/50">
                        ⏱️ {story.postedAt}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
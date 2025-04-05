

export const useLikeVideo = () => {
    const likeVideo = async (videoId: string, session: any) => {
        if (!session || !session.user) {
            return alert("Please sign in to like videos.");
        }

        try {
            const res = await fetch(`/api/videos/${videoId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to like video.");
            }

            const data = await res.json();
            console.log("Video liked:", data);
        } catch (err) {
            console.error("Error liking video:", err);
        }
    };

    return { likeVideo };
};

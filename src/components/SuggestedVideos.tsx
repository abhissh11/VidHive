"use client";
import { useEffect, useState } from "react";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  uploadedBy: {
    name: string;
    image?: string;
  };
}

interface Props {
  currentVideoId: string;
  onVideoClick: (videoId: string) => void;
}

export default function SuggestedVideos({
  currentVideoId,
  onVideoClick,
}: Props) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (res.ok) {
          const data = await res.json();
          // Remove the currently playing video and limit to 8 videos
          setVideos(
            data.videos
              .filter((video: Video) => video._id !== currentVideoId)
              .slice(0, 8)
          );
        }
      } catch (error) {
        console.error("Error fetching suggested videos:", error);
      }
    }

    fetchVideos();
  }, [currentVideoId]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-2">Suggested Videos</h2>
      {videos.map((video) => (
        <div
          key={video._id}
          onClick={() => onVideoClick(video._id)}
          className="cursor-pointer flex gap-3 hover:bg-purple-950 p-2 rounded-lg transition"
        >
          <video
            src={video.videoUrl}
            className="w-24 h-16 rounded-md object-cover"
            preload="metadata"
          />
          <div>
            <p className="text-sm font-medium">{video.title}</p>
            <p className="text-xs text-gray-400">{video.uploadedBy.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

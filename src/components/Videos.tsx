"use client";
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard"; // Import VideoCard component
import { User } from "lucide-react";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadedBy: string;
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched videos:", data); // Debugging
        setVideos(data.videos || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white">Loading videos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (videos.length === 0)
    return <p className="text-gray-400">No videos uploaded yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Uploaded Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videos.map((video) =>
          video ? (
            <div className="w-full flex flex-col shadow-xs rounded-lg group cursor-pointer">
              <div className="w-full">
                <video
                  controls
                  src={video.videoUrl}
                  className="w-full rounded-lg group-hover:rounded-xs hover:-translate-y-1 transition-all duration-100"
                />
              </div>
              <div className="flex flex-start gap-2 p-2">
                <div className="flex gap-1">
                  <User
                    size={35}
                    className="bg-neutral-200 text-neutral-800 rounded-full"
                  />
                </div>
                <div className="flex flex-col px-1">
                  <h4 className="text-lg font-normal text-white">
                    {video.title}
                  </h4>
                  <p className="text-sm font-medium text-neutral-400 hover:text-neutral-50">
                    Uploaded by: {video.uploadedBy}
                  </p>
                  <p className="text-sm font-normal text-neutral-400">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

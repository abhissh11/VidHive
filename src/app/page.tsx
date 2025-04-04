"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import HomeSkeleton from "@/components/HomeSkeleton";

interface Video {
  _id: string;
  title: string;
  thumbnailUrl: string;
  uploadedBy: {
    _id: string;
    name: string;
    image: string;
  };
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) return <HomeSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (videos.length === 0)
    return <p className="text-gray-400">No videos uploaded yet.</p>;

  return (
    <div className="w-full flex justify-center items-center px-6">
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className="min-w-[200px] cursor-pointer"
            onClick={() => router.push(`/watch/${video._id}`)}
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}

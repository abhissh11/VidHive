"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  uploadedBy: {
    name: string;
    image: string;
  };
}

export default function LikedVideosList({ userId }: { userId: string }) {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(userId);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch liked videos");
        }

        const data = await res.json();
        setLikedVideos(data.user?.likedVideos || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (likedVideos.length === 0) {
    return <p className="text-center text-gray-600">No liked videos found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {likedVideos.map((video) => (
        <div
          key={video._id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-40">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-3">
            <h2 className="text-lg font-medium truncate">{video.title}</h2>
            <div className="flex items-center mt-2">
              <div className="relative w-8 h-8 rounded-full mr-2 overflow-hidden">
                <Image
                  src={video.uploadedBy.image}
                  alt={video.uploadedBy.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <p className="text-gray-600 truncate">{video.uploadedBy.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

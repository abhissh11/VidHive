"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bookmark, ThumbsUp, User } from "lucide-react";

import SuggestedVideos from "@/components/SuggestedVideos";
import Image from "next/image";
import WatchSkeleton from "@/components/WatchSkeleton";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadedBy: {
    _id: string;
    name: string;
    image?: string;
  };
}

export default function WatchVideo() {
  const params = useParams();
  const router = useRouter();
  const videoId = params?.videoId as string;

  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!videoId) return;

    async function fetchVideo() {
      try {
        const res = await fetch(`/api/videos/${videoId}`);
        if (res.ok) {
          const data = await res.json();
          setVideo(data.video);
        } else {
          console.error("Failed to fetch video");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }

    fetchVideo();
  }, [videoId]);

  if (!video) return <WatchSkeleton />;

  return (
    <div className="px-4 w-full max-w-6xl mx-auto mt-4 flex flex-col md:flex-row gap-6">
      {/* Video Player - Left */}
      <div className="w-full md:w-2/3">
        <video controls src={video.videoUrl} className="w-full rounded-lg" />
        <div className="shadow-xs shadow-purple-950 p-2 rounded-b-lg">
          <h1 className="text-xl font-bold mt-4">{video.title}</h1>
          <p className="text-gray-400">{video.description}</p>
        </div>

        <div className="flex justify-between items-center flex-row-reverse">
          <div className="py-4 px-2 flex gap-4">
            <ThumbsUp
              size={44}
              className="hover:bg-purple-900 p-2 cursor-pointer rounded-lg hover:-translate-y-1 transition-all duration-100"
            />
            <Bookmark
              size={44}
              className="hover:bg-purple-900 p-2 cursor-pointer rounded-lg hover:-translate-y-1 transition-all duration-100"
            />
          </div>

          {/* Uploader Info */}
          <div className="flex items-center mt-4">
            {video.uploadedBy.image ? (
              <Image
                src={video.uploadedBy.image}
                width={50}
                height={50}
                alt={video.uploadedBy.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <User
                size={40}
                className="bg-neutral-200 text-neutral-800 rounded-full"
              />
            )}
            <p className="ml-3 text-lg font-medium text-white">
              {video.uploadedBy.name}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Videos - Right */}
      <div className="w-full md:w-1/3">
        <SuggestedVideos
          currentVideoId={videoId}
          onVideoClick={(id) => router.push(`/watch/${id}`)}
        />
      </div>
    </div>
  );
}

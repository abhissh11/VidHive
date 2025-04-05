// components/FetchVideoClient.tsx
"use client";

import { useEffect, useState } from "react";

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

export default function FetchWatchVideo({
  videoId,
  children,
}: {
  videoId: string;
  children: (video: Video | null) => React.ReactNode;
}) {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
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

  return <>{children(video)}</>;
}

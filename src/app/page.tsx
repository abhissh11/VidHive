"use client";

import VideoCard from "@/components/VideoCard";
import { useRouter } from "next/navigation"; // Use "next/router" if using Pages Router

export default function Home() {
  const router = useRouter();

  const videos = Array.from({ length: 10 }, (_, index) => ({ id: index }));

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap gap-4 justify-center items-start p-4">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="w-1/5 min-w-[260px] cursor-pointer"
            onClick={() => router.push(`/watch/${vid.id}`)}
          >
            <VideoCard />
          </div>
        ))}
      </div>
    </div>
  );
}

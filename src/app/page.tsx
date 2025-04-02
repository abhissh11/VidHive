"use client";

import VideoCard from "@/components/VideoCard";
import Videos from "@/components/Videos";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const videos = Array.from({ length: 10 }, (_, index) => ({ id: index }));

  return (
    <>
      <div className="w-full flex justify-center items-center px-6">
        <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="min-w-[200px] cursor-pointer"
              onClick={() => router.push(`/watch/${vid.id}`)}
            >
              <VideoCard />
            </div>
          ))}
        </div>
      </div>
      <Videos />
    </>
  );
}

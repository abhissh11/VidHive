"use client";

import { useRouter } from "next/navigation";
import SuggestedVideos from "./SuggestedVideos";

interface SuggestedVideosWrapperProps {
  currentVideoId: string;
}

export default function SuggestedVideosWrapper({
  currentVideoId,
}: SuggestedVideosWrapperProps) {
  const router = useRouter();

  return (
    <SuggestedVideos
      currentVideoId={currentVideoId}
      onVideoClick={(id) => router.push(`/watch/${id}`)}
    />
  );
}

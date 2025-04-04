import { User } from "lucide-react";
import Image from "next/image";

interface VideoProps {
  video: {
    _id: string;
    title: string;
    thumbnailUrl: string;
    uploadedBy: {
      _id: string;
      name: string;
      image: string;
    };
  };
}

export default function VideoCard({ video }: VideoProps) {
  return (
    <div className="w-full flex flex-col shadow-xs rounded-lg group cursor-pointer">
      <div className="w-full">
        <img
          src={video.thumbnailUrl}
          alt="video-thumbnail"
          className="rounded-lg group-hover:rounded-xs hover:-translate-y-1 transition-all duration-100"
        />
      </div>
      <div className="flex flex-start gap-2 p-2">
        <div className="flex gap-1">
          {video.uploadedBy.image ? (
            <Image
              src={video.uploadedBy.image}
              width={30}
              height={30}
              alt={video.uploadedBy.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <User
              size={35}
              className="bg-neutral-200 text-neutral-800 rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col px-1">
          <h4 className="text-lg font-normal text-neutral-200">
            {video.title}
          </h4>
          <p className="text-sm font-medium text-neutral-400 hover:text-neutral-50">
            {video.uploadedBy?.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}

import { User } from "lucide-react";
import React from "react";

export default function VideoCard() {
  return (
    <div className="w-full flex flex-col shadow-xs rounded-lg group cursor-pointer">
      <div className="w-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSz6-T5QSkQKloNOr6nj5zr5Q7am1lgqnPtw&s"
          alt="video-card"
          className="rounded-lg group-hover:rounded-xs hover:-translate-y-1 transition-all duration-100"
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
          <h4 className="text-lg font-normal text-white">Video Title Here</h4>
          <p className="text-sm font-medium text-neutral-400 hover:text-neutral-50">
            Uploader Name
          </p>
          <p className="text-sm font-normal text-neutral-400">23k views</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between bg-base pl-20 pr-4 md:px-20 py-2 shadow-sm shadow-purple-950">
      <div className="">
        <button className="px-4 py-2 bg-purple-800 text-white text-base font-normal rounded-md cursor-pointer hover:bg-purple-700">
          VidHive
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <div className="p-1 flex items-center border  rounded-lg border-gray-900 shadow-sm shadow-purple-950 text-gray-400  text-sm font-normal  cursor-pointer ">
          <input
            placeholder="Search for videos"
            className="outline-none px-2 hidden sm:block"
          />
          <Search size={36} className="p-2" />
        </div>
      </div>
    </div>
  );
}

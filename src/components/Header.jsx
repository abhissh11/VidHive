import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between px-10 py-2 border-b border-gray-800">
      <div className="">
        <button className="px-4 py-2 bg-purple-800 text-white text-base font-normal rounded-md cursor-pointer hover:bg-purple-700">
          VidHive
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <button className="px-4 py-2 bg-white text-black text-base font-normal rounded-md cursor-pointer hover:bg-gray-200">
          Sign in
        </button>
        <button className="px-4 py-2 bg-white text-black text-base font-normal rounded-md hover:bg-gray-200 cursor-pointer">
          Upload video
        </button>
      </div>
    </div>
  );
}

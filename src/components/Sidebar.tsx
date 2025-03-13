"use client";
import React, { useState } from "react";
import {
  FiHome,
  FiThumbsUp,
  FiUpload,
  FiClock,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

const navItems = [
  { name: "Home", icon: <FiHome />, route: "/" },
  { name: "Liked Videos", icon: <FiThumbsUp />, route: "/feed/liked" },
  { name: "Upload Video", icon: <FiUpload />, route: "/upload-video" },
  { name: "Watch Later", icon: <FiClock />, route: "/feed/watch-later" },
  { name: "Settings", icon: <FiSettings />, route: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`h-screen bg-base shadow-md shadow-purple-950 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } fixed top-0 left-0 z-50 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        className="p-4 focus:outline-none hover:bg-neutral-950"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Items */}
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.route}
            className="flex items-center space-x-4 px-4 py-3 hover:bg-neutral-950 transition"
          >
            <span className="text-lg md:text-2xl ">{item.icon}</span>
            {!isCollapsed && <span className="text-sm">{item.name}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}

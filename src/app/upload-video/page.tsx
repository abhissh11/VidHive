"use client";
import React, { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!video) {
      setMessage("Please select a video file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", video);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // Sending FormData directly
      });

      if (!response.ok) {
        throw new Error("Failed to upload video.");
      }

      const data = await response.json();
      setLoading(false);
      setMessage(data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Upload Video</h1>

      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-4 p-2 border border-purple-900 rounded w-80"
      />
      <textarea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2 p-2 border border-purple-900 rounded w-80"
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files?.[0] || null)}
        className="mt-2 bg-blue-600 text-sm cursor-pointer p-1 px-2 rounded"
      />

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-purple-800 cursor-pointer text-white rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>

      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
}

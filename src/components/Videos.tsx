"use client";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadedBy: string; // User ID
}

interface UserDetail {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [users, setUsers] = useState<{ [key: string]: UserDetail }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched videos:", data); // Debugging

        const videoList: Video[] = data.videos || [];
        setVideos(videoList);

        // Fetch user details for each unique uploadedBy
        const uniqueUserIds = [...new Set(videoList.map((v) => v.uploadedBy))];
        const userDetails: { [key: string]: UserDetail } = {};

        await Promise.all(
          uniqueUserIds.map(async (userId) => {
            try {
              const userRes = await fetch(
                `http://localhost:3000/api/user?userId=${userId}`
              );
              if (userRes.ok) {
                const userData = await userRes.json();
                userDetails[userId] = userData.user;
              }
            } catch (err) {
              console.error(`Error fetching user ${userId}:`, err);
            }
          })
        );

        setUsers(userDetails);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <p className="text-white">Loading videos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (videos.length === 0)
    return <p className="text-gray-400">No videos uploaded yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Uploaded Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videos.map((video) => {
          const user = users[video.uploadedBy];

          return (
            <div
              key={video._id}
              className="w-full flex flex-col shadow-xs rounded-lg group cursor-pointer"
            >
              <div className="w-full">
                <video
                  controls
                  src={video.videoUrl}
                  className="w-full rounded-lg group-hover:rounded-xs hover:-translate-y-1 transition-all duration-100"
                />
              </div>
              <div className="flex flex-start gap-2 p-2">
                <div className="flex gap-1">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-9 h-9 text-sm font-light rounded-full"
                    />
                  ) : (
                    <User
                      size={35}
                      className="bg-neutral-200 text-neutral-800 rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col px-1">
                  <h4 className="text-lg font-normal text-white">
                    {video.title}
                  </h4>
                  <p className="text-sm font-medium text-neutral-400 hover:text-neutral-50">
                    {user?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

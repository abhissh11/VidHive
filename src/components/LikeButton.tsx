import { likeVideoAction } from "@/lib/actions/video.actions";
import { authOptions } from "@/lib/auth";
import { ThumbsUp } from "lucide-react";
import { getServerSession } from "next-auth";

interface LikeButtonProps {
  videoId: string;
}

export default async function LikeButton({ videoId }: LikeButtonProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <button
        disabled
        className="text-gray-500 cursor-not-allowed flex items-center gap-1"
        title="Sign in to like"
      >
        <ThumbsUp size={20} />
      </button>
    );
  }

  return (
    <form action={likeVideoAction.bind(null, videoId)}>
      <button
        type="submit"
        className="hover:bg-purple-900 p-2 cursor-pointer rounded-lg hover:-translate-y-1 transition-all duration-100"
      >
        <ThumbsUp size={20} />
      </button>
    </form>
  );
}

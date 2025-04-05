import LikedVideosList from "@/components/FetchLikedVideo";
import SignInButton from "@/components/SigninButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function LikedVideosPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex justify-center gap-6 items-center my-10">
        <SignInButton />
        <p className="text-neutral-400 text-base">
          To see your liked videos.
        </p>{" "}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Liked Videos</h1>
      <LikedVideosList userId={session.user.id} />
    </div>
  );
}

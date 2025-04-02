import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { CornerRightDown } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import Videos from "@/components/Videos";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="h-screen w-full px-6 py-4 flex flex-col items-start">
      <div className="w-full flex flex-col gap-6">
        {session && (
          <>
            <div className="w-full sm:flex sm:justify-start items-center gap-20">
              <div className="flex gap-2 ">
                <Image
                  src={`${session.user?.image}`}
                  width={80}
                  height={50}
                  alt="user-img"
                  className="rounded-full p-2"
                />
                <div className="flex flex-col justify-center gap-1 items-start">
                  <h4 className="text-lg md:text-xl font-bold">
                    {session.user?.name}
                  </h4>
                  <p className="text-sm text-neutral-400 font-light">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <SignOutButton />
            </div>
          </>
        )}
        <div className="px-4 flex flex-col">
          <h4 className="text-2xl font-bold flex gap-1">
            Your Videos{" "}
            <span className="pt-2 bg-purple-800 p-2 rounded-md font-bold">
              <CornerRightDown />
            </span>{" "}
          </h4>
          <Videos />
        </div>
      </div>
    </div>
  );
}

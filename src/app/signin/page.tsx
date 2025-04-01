"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Signin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/settings");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to NextAuth App</h1>
      {session ? (
        <>
          <p className="mt-4">Signed in as {session.user?.name}</p>
          <Image
            src={`${session.user?.image}`}
            width={80}
            height={50}
            alt="user-img"
            className="rounded-full p-2"
          />
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 bg-red-400 hover:bg-red-500 cursor-pointer text-white rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}

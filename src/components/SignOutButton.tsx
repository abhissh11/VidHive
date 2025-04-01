"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="shadow-purple-800 shadow-sm cursor-pointer hover:bg-purple-800 px-4 py-2 rounded-md"
    >
      Sign out
    </button>
  );
}

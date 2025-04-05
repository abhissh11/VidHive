"use client";

import { redirect } from "next/navigation";

export default function SignInButton() {
  return (
    <button
      onClick={() => redirect("/signin")}
      className="shadow-purple-800 shadow-sm cursor-pointer hover:bg-purple-800 px-4 py-2 rounded-md"
    >
      Sign In
    </button>
  );
}

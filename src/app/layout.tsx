import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./../components/Header";
import Sidebar from "@/components/Sidebar";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidHive - Video Streaming Platform",
  description: "Watch and stream your videos on VidHive for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header Fixed at the Top */}
        <Header />

        <div className="flex">
          {/* Sidebar below the Header */}
          <div className=" min-h-screen bg-gray-900 text-white">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 sm:pl-20 pl-14 sm:pr-4 py-4">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

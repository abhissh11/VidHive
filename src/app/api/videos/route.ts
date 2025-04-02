import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";

export async function GET() {
    await connectDB();

    try {
        const videos = await Video.find().sort({ createdAt: -1 }); // Fetch all videos sorted by latest

        return NextResponse.json({ videos }, { status: 200 });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

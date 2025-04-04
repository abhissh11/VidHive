import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";

export async function GET(req: NextRequest, context: { params: Promise<{ videoId: string }> }) {
    await connectDB();

    try {
        const { videoId } = await context.params;

        if (!videoId) {
            return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
        }

        if (videoId.length !== 24) {
            return NextResponse.json({ error: "Invalid Video ID" }, { status: 400 });
        }

        const video = await Video.findById(videoId).populate("uploadedBy", "_id name image");

        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        console.error("Error fetching video:", error);
        return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
    }
}

import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";
import { NextResponse } from "next/server";

interface Context {
    params: {
        videoId: string;
    };
}

export async function GET(request: Request, context: Context) {
    await connectDB();

    try {
        const videoId = context.params.videoId;

        if (!videoId) {
            return NextResponse.json(
                { error: "Video ID is required" },
                { status: 400 }
            );
        }

        const video = await Video.findById(videoId).populate(
            "uploadedBy",
            "_id name image"
        );

        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        console.error("Error fetching video:", error);
        return NextResponse.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}
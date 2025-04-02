import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/lib/cloudinary";
import { User } from "@/models/User";
import { Video } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    await connectDB();

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, videoFile } = await req.json();

    if (!videoFile) {
        return NextResponse.json({ errr: "No video file provided" }, { status: 400 })
    }
    try {
        const uploadRes = await cloudinary.uploader.upload(videoFile, {
            resource_type: "video",
            folder: "videos"
        });

        if (!uploadRes.secure_url) {
            throw new Error("Cloudinary upload failed")
        }

        // save video detail to mongodb
        const user = await User.findOne({ email: session.user?.email });

        const newVideo = new Video({
            title,
            description,
            videoUrl: uploadRes.secure_url,
            publicId: uploadRes.public_id,
            uploadedBy: user._id,
        });

        await newVideo.save();
        return NextResponse.json({ message: "Video uploaded successfully", video: newVideo }, { status: 201 })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
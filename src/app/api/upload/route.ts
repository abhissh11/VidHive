import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/lib/cloudinary";
import { User } from "@/models/User";
import { Video } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse FormData
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const videoFile = formData.get("videoFile") as File;

        if (!videoFile) {
            return NextResponse.json({ error: "No video file provided" }, { status: 400 });
        }

        // Convert file to buffer for Cloudinary upload
        const arrayBuffer = await videoFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary with eager transformations for a thumbnail
        const uploadRes = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "videos",
                    eager: [{ format: "jpg", transformation: [{ width: 300, height: 200, crop: "thumb" }] }],
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as UploadApiResponse);
                }
            ).end(buffer);
        });

        if (!uploadRes.secure_url) {
            throw new Error("Cloudinary upload failed");
        }

        // Ensure eager transformation is present
        const thumbnailUrl = uploadRes.eager?.[0]?.secure_url;
        if (!thumbnailUrl) {
            throw new Error("Thumbnail generation failed");
        }

        // Save video details to MongoDB
        const user = await User.findOne({ email: session.user?.email });
        const newVideo = new Video({
            title,
            description,
            videoUrl: uploadRes.secure_url,
            thumbnailUrl: thumbnailUrl, // ✅ Thumbnail added
            publicId: uploadRes.public_id,
            uploadedBy: user._id,
        });

        await newVideo.save();
        return NextResponse.json({ message: "Video uploaded successfully", video: newVideo }, { status: 201 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

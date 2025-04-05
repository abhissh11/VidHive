import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(
    request: Request,
    context: { params: Promise<{ userId: string }> }
) {
    await connectDB();

    try {
        const { userId } = await context.params;

        if (!userId || userId === "") {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findById(userId)
            .populate("uploadedVideos")
            .populate("likedVideos")
            .populate("bookmarkedVideos")
            .lean();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";

export async function POST(
    req: NextRequest,
    { params }: { params: { videoId: string } }
) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userId = session.user?.id;
        const { videoId } = params;

        if (!userId || !videoId) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        await User.findByIdAndUpdate(userId, {
            $addToSet: { likedVideos: videoId },
        });

        return NextResponse.json({ message: "Video liked!" });
    } catch (err) {
        console.error("Error liking video:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

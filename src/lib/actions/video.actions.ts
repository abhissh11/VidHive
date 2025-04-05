"use server";

import { getServerSession } from "next-auth";
import { connectDB } from "../db";
import { authOptions } from "../auth";
import { Video } from "@/models/Video";

//

export async function likeVideoAction(videoId: string) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    await connectDB();

    await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: session.user.id },
    });

    // return { success: true };
}

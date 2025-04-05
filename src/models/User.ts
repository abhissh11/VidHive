import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    image: string;
    uploadedVideos: mongoose.Schema.Types.ObjectId[];
    likedVideos: mongoose.Schema.Types.ObjectId[];
    bookmarkedVideos: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },

    // Relations with Video model
    uploadedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    bookmarkedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

export const User = models.User || mongoose.model<IUser>("User", UserSchema);

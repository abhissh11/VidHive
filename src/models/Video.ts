import mongoose, { Schema, Document, models } from "mongoose"

export interface IVedio extends Document {
    title: string,
    description: string,
    videoUrl: string,
    publicId: string,   // Cloudinary public ID for deletion
    uploadedBy: mongoose.Schema.Types.ObjectId;
}

const videoSchema = new Schema<IVedio>(
    {
        title: { type: String, required: true },
        description: { type: String },
        videoUrl: { type: String, required: true },
        publicId: { type: String, required: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    }, { timestamps: true }
);

export const Video = models.Video || mongoose.model<IVedio>("Video", videoSchema);
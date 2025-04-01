import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("⚠️ MONGODB_URI is missing in .env.local file!");
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;

        await mongoose.connect(MONGODB_URI, {
            dbName: "nextauth_db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);

        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
};
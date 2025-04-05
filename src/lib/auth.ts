import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            await connectDB();
            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                });
            }

            return true;
        },
        async session({ session }) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user?.email });

            if (dbUser) {
                session.user = {
                    id: dbUser._id.toString(),
                    name: dbUser.name,
                    email: dbUser.email,
                    image: dbUser.image,
                };
            }

            return session;
        },
    },
};

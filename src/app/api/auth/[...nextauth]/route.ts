import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
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
            const user = await User.findOne({ email: session.user?.email });
            session.user = user;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
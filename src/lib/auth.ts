import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

// Define authentication options
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

// Initialize NextAuth and export utilities
const nextAuthInstance = NextAuth(authOptions);
export const { handlers, signIn, signOut } = nextAuthInstance;

// Export default for getServerSession
export default nextAuthInstance;

// Debug log to verify exports
console.log("NextAuth exports:", { handlers, signIn, signOut });
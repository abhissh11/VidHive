import { getServerSession } from "next-auth";

export async function checkSession() {
    const session = await getServerSession();

    return session;
}
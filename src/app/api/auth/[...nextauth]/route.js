import NextAuth from "next-auth";
import {authOptions} from "@/middleware/authProviders";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {User} from "../models/User";
import connectDB from "./mongoDB";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_CLIENT_ID,
            clientSecret: process.env.CLIENT_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            await connectDB()
            let userExists = false

            await User.findOne({email: profile.email})
                .then(async (user) => userExists = user)

            if(!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name,
                    image: profile.picture
                })
            }

            return true
        },
        async session({ session, token, user }) {
            await connectDB()
            await User.findOne({email: session.user.email})
                .then((user) => {
                    session.user.id = user._id.toString()
                    session.user.hui = 'hui'
                })

            // console.log(session, token, user)
            return session
        }
    }
}

export default NextAuth(authOptions)
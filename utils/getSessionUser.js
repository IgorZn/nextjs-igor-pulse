import {getServerSession} from "next-auth";
import {authOptions} from "./authProviders";

export const getSessionUser = async () => {
    return await getServerSession(authOptions)
        .then(session => {
            if (!session) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
            }

            return {
                user: session.user,
                userId: session.user.id
            }
        })
        .catch(e => {
            console.error(e)
            return null
        })



}
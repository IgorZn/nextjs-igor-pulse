import {PropertyModel} from "@/../models/Property";
import connectDB from "@/../utils/mongoDB";



export const GET = async (request, { params }) => {
    await connectDB()
    const {id} = await params

    return PropertyModel.findById(id)
        .then(data => {
            if(!data) return new Response('Not Found', { status: 404 })

            return new Response(JSON.stringify(data), {
                status: 200
            })
        })
        .catch(() => {
            return new Response('Internal Server Error', { status: 500 })
        })
}
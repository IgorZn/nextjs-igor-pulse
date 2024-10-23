import {PropertyModel} from "@/../models/Property";



export const GET = async (request, { params }) => {
    return await PropertyModel.findById(params.id)
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
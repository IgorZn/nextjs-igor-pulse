import {PropertyModel} from "@/../models/Property";



export const GET = async (request) => {
    return await PropertyModel.find({})
        .then(data => {
            return new Response(JSON.stringify(data), {
                status: 200
            })
        })
        .catch(error => {
            return new Response('Internal Server Error', { status: 500 })
        })
}
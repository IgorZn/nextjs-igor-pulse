import connectDB from '../../../../../../utils/mongoDB'
import { PropertyModel } from '../../../../../../models/Property'

export const GET = async (request, { params }) => {
    const { id } = await params
    await connectDB()
    return await PropertyModel.find({ isEnabled: true, _id: id })
        .then((data) => {
            return new Response(JSON.stringify(data), {
                status: 200,
            })
        })
        .catch((error) => {
            return new Response('Internal Server Error', { status: 500 })
        })
}

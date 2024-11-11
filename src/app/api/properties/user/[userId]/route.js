import connectDB from '@/../utils/mongoDB'
import { PropertyModel } from '@/../models/Property'

export const GET = async (request, { params }) => {
	await connectDB()
	return await PropertyModel.find({ owner: params.userId, isEnabled: true })
		.then((data) => {
			return new Response(JSON.stringify(data), {
				status: 200,
			})
		})
		.catch((error) => {
			return new Response('Internal Server Error111', { status: 500 })
		})
}

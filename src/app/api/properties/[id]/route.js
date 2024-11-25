import { PropertyModel } from '@/../models/Property'
import connectDB from '@/../utils/mongoDB'
import { getSessionUser } from '@/../utils/getSessionUser'

export const GET = async (request, { params }) => {
	await connectDB()
	const { id } = await params

	return PropertyModel.findById(id)
		.then(data => {
			console.log(id, 'data>>>', data)
			if (!data) return new Response('Not Found', { status: 404 })

			return new Response(JSON.stringify(data), {
				status: 200,
			})
		})
		.catch(() => {
			return new Response('Internal Server Error', { status: 500 })
		})
}

export const DELETE = async (request, { params }) => {
	await connectDB()
	const { id } = await params
	const { userId, user } = await getSessionUser()

	console.log(userId, user)
	if (!userId) {
		return new Response('Unauthorized', { status: 401 })
	} else {
		return PropertyModel.findByIdAndUpdate(id, { isEnabled: false }, { new: true })
			.then(data => {
				return new Response(JSON.stringify({ data }), {
					status: 200,
				})
			})
			.catch(() => {
				return new Response('Internal Server Error', { status: 500 })
			})
	}
}

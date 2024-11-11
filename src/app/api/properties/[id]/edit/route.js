import connectDB from '@/../utils/mongoDB'
import { PropertyModel } from '@/../models/Property'
import { getSessionUser } from '@/../utils/getSessionUser'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

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
export const PUT = async (request, { params }) => {
	await connectDB()

	const { userId, user } = await getSessionUser()
	const { id } = await params
	const propertyObj = await request.json()
	propertyObj.owner = userId

	return await PropertyModel.findByIdAndUpdate(id, propertyObj, { new: true, })
		.then(data => {
			return NextResponse.json(JSON.stringify(data), { status: 200 })
		})
		.catch(e => console.log(e))
}

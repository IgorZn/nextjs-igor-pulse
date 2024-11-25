import connectDB from '@/../utils/mongoDB'
import { PropertyModel } from '@/../models/Property'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
	await connectDB()
	return PropertyModel.find({ owner: params.userId, isEnabled: true })
		.then(data => {
			return NextResponse.json(data, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

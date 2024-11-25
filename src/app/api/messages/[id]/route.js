import { NextResponse } from 'next/server'
import { Message } from '@/../models/Message'
import connectDB from '@/../utils/mongoDB'
import { getSessionUser } from '@/../utils/getSessionUser'

export const PUT = async (request, { params }) => {
	await connectDB()
	const { id } = await params
	const { userId, user } = await getSessionUser()

	// Проверяем, что пользователь авторизован
	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	return Message.findByIdAndUpdate(id, { isRead: true }, { new: true })
		.then(data => {
			return NextResponse.json({ message: data }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

export const DELETE = async (request, { params }) => {
	await connectDB()
	const { id } = await params
	const { userId, user } = await getSessionUser()

	// Проверяем, что пользователь авторизован
	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	return Message.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
		.then(() => {
			return NextResponse.json({ message: 'Message has been delete' }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

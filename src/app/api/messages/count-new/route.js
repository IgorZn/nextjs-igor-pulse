import { NextResponse } from 'next/server'
import { Message } from '@/../models/Message'
import { getSessionUser } from '@/../utils/getSessionUser'
import connectDB from '@/../utils/mongoDB'

export const GET = async (request, { params }) => {
	await connectDB()
	const { userId, user } = await getSessionUser()

	// Проверяем, что пользователь авторизован
	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	return Message.countDocuments({ receiver: userId, isRead: false })
		.then(data => {
			return NextResponse.json({ count: data }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

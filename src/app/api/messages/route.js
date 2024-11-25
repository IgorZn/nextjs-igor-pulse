import { NextResponse } from 'next/server'
import { getSessionUser } from '@/../utils/getSessionUser'
import connectDB from '@/../utils/mongoDB'
import { Message } from '@/../models/Message'

export const dynamic = 'force-dynamic'

export const GET = async (request, { params }) => {
	await connectDB()

	// Получаем сессию
	const { userId, user } = await getSessionUser()

	// Проверяем, что пользователь авторизован
	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID is required' }, { status: 401 })
	}

	return Message.find({ receiver: userId })
		.populate('sender receiver property')
		.then(data => {
			return NextResponse.json({ messages: data }, { status: 200 })
		})
}

export const POST = async (request, { params }) => {
	await connectDB()
	const message = await request.json()

	// Получаем сессию
	const { userId, user } = await getSessionUser()

	// Проверяем, что пользователь авторизован
	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	// Проверяем, что отправитель не является получателем
	if (user.id === message.sender) {
		return NextResponse.json({ message: 'You can not send a message to yourself' }, { status: 401 })
	}

	return await Message.create(message)
		.then(data => {
			return NextResponse.json({ message: data }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

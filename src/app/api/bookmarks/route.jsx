import connectDB from '@/../utils/mongoDB'
import { getSessionUser } from '@/../utils/getSessionUser'
import { NextResponse } from 'next/server'
import { User } from '@/../models/User'

export const POST = async req => {
	await connectDB()
	const { id } = await req.json()

	// Получаем сессию
	const { userId, user } = await getSessionUser()

	await User.find({ _id: userId }, 'bookmarks').then(data => {
		const [bookmarks] = data
		console.log('bookmarks', bookmarks?.bookmarks)
	})

	if (!userId || !user) {
		return NextResponse.json(
			{ message: 'User ID or User not found' },
			{ status: 401 }
		)
	}

	return NextResponse.json({ message: 'Success' }, { status: 200 })
}

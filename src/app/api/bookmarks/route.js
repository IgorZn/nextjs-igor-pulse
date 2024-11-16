import connectDB from '@/../utils/mongoDB'
import { getSessionUser } from '@/../utils/getSessionUser'
import { NextResponse } from 'next/server'
import { User } from '@/../models/User'

export const dynamic = 'force-dynamic'

export const POST = async req => {
	await connectDB()
	const { id } = await req.json()
	let message, isBookmarked

	// Получаем сессию
	const { userId, user } = await getSessionUser()

	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	const userBookmarks = await User.findById({ _id: userId }, 'bookmarks')

	try {
		if (userBookmarks.bookmarks.includes(id)) {
			userBookmarks.bookmarks.pull(id)
			userBookmarks.save()
			message = 'Bookmark removed'
			isBookmarked = false
		} else {
			userBookmarks.bookmarks.push(id)
			userBookmarks.save()
			message = 'Bookmark added'
			isBookmarked = true
		}

		return NextResponse.json({ message, isBookmarked }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ message: e.message }, { status: 500 })
	}
}

export const GET = async (request, { params }) => {
	await connectDB()
	const { userId, user } = await getSessionUser()

	return await User.findById({ _id: userId }, 'bookmarks')
		.populate('bookmarks')
		.then(data => {
			return NextResponse.json({ bookmarks: data.bookmarks }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

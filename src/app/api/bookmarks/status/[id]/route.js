import connectDB from '@/../utils/mongoDB'
import { getSessionUser } from '@/../utils/getSessionUser'
import { NextResponse } from 'next/server'
import { User } from '../../../../../../models/User'

export const GET = async (request, { params }) => {
	const { id } = await params
	await connectDB()

	const { userId } = await getSessionUser()

	if (!userId) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	return await User.findById({ _id: userId }, 'bookmarks')
		.then(data => {
			return NextResponse.json({ isBookmarked: data.bookmarks.includes(id) }, { status: 200 })
		})
		.catch(e => console.log(e))
}

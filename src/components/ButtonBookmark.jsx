'use client'
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { addRemoveBookmark, fetchBookmarkStatus } from '../../utils/fetchMethods'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

function ButtonBookmark({ property }) {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const { status } = useSession()

	const handleBookmark = async () => {
		if (status !== 'authenticated') return toast.error('Please sign in to bookmark a property')
		const res = await addRemoveBookmark(property._id)
		const { message, isBookmarked: bookmarked } = await res.json()
		setIsBookmarked(bookmarked)
		toast.info(message)
	}

	useEffect(() => {
		if (status === 'authenticated') {
			fetchBookmarkStatus(property._id).then(async res => {
				const { isBookmarked } = await res.json()
				setIsBookmarked(isBookmarked)
			})
		}
	}, [])

	return isBookmarked ? (
		<button
			onClick={handleBookmark}
			className="flex w-full items-center justify-center rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
			<FaBookmark className="mr-2" /> Remove Bookmark
		</button>
	) : (
		<button
			onClick={handleBookmark}
			className="flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
			<FaBookmark className={'mr-2'} /> Bookmark Property
		</button>
	)
}

export default ButtonBookmark

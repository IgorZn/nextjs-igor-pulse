'use client'
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { fetchBookmarkStatus } from '../../utils/fetchMethods'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useHandleBookmark } from '../../utils/hooks'

function ButtonBookmark({ property }) {
	const [loading, setLoading] = useState(true)
	const { status } = useSession()
	const { isBookmarked, setIsBookmarked, handleBookmark, message } = useHandleBookmark(property._id)

	useEffect(() => {
		if (message.length > 0) message.includes('added') ? toast.success(message) : toast.info(message)
	}, [message])

	useEffect(() => {
		if (status === 'authenticated') {
			fetchBookmarkStatus(property._id).then(async res => {
				const { isBookmarked } = await res.json()
				setIsBookmarked(isBookmarked)
			})
		} else {
			return
		}

		setLoading(!loading)
	}, [property._id, status])

	if (loading) return <p className={'text-center'}>Loading...</p>

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

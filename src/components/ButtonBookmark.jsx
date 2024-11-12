import React from 'react'
import { FaBookmark } from 'react-icons/fa'
import { addRemoveBookmark } from '../../utils/fetchMethods'

function ButtonBookmark({ property }) {
	return (
		<button
			onClick={() => addRemoveBookmark(property._id)}
			className="flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
			<FaBookmark className={'mr-2'} /> Bookmark Property
		</button>
	)
}

export default ButtonBookmark

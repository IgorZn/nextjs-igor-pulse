import React from 'react'
import { FaShare } from 'react-icons/fa'

function ShareButtons(props) {
	return (
		<button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
			<FaShare className={'mr-2'} /> Share Property
		</button>
	)
}

export default ShareButtons

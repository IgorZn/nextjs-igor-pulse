import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchCountNewMessages } from '../../utils/fetchMethods'
import { useMessageCountContext } from '@/context/GlobalContext'

function CountMessagesNew({ session }) {
	console.log('CountMessagesNew__session>>>', session)
	const [count, setCount] = useState(0)
	const { unreadCount, setUnreadCount } = useMessageCountContext(0)

	useEffect(() => {
		if (!session?.user) return
		fetchCountNewMessages()
			.then(async data => {
				const { count } = await data.json()
				setUnreadCount(count)
			})
			.catch(e => {
				console.log(e)
			})
	}, [])

	return (
		<>
			<Link href="/messages" className="group relative">
				<button
					type="button"
					className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5"></span>
					<span className="sr-only">View notifications</span>
					<svg
						className="size-6"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						aria-hidden="true">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button>
				<span
					className={`absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full ${unreadCount ? 'bg-red-600' : 'bg-gray-600'} px-2 py-1 text-xs font-bold leading-none text-white`}>
					{unreadCount}
				</span>
			</Link>
		</>
	)
}

export default CountMessagesNew

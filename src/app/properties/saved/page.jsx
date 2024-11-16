'use client'
import React, { useEffect } from 'react'
import { getSavedBookmarks } from '@/../utils/fetchMethods'
import { useSession } from 'next-auth/react'
import Loading from '@/app/loading'
import Link from 'next/link'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import PropertiesCard from '@/components/PropertiesCard'

function SavedProperties(props) {
	const [bookmarks, setBookmarks] = React.useState([])
	const [loading, setLoading] = React.useState(true)

	useEffect(() => {
		getSavedBookmarks()
			.then(async data => {
				const { bookmarks } = await data.json()
				setBookmarks(bookmarks)
				setLoading(!loading)
			})
			.catch(e => {
				toast.error(e.message)
				console.log(e)
			})
	}, [])

	return (
		<>
			{loading ? (
				<Loading />
			) : bookmarks.length > 0 ? (
				// Saved Properties
				<section className="px-4 py-6">
					<div className="container-xl m-auto px-4 py-6 lg:container">
						<h1 className="mb-6 text-3xl font-bold">Your Saved Properties</h1>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{bookmarks.map(item => (
								<PropertiesCard key={item._id} {...item} />
							))}
						</div>
					</div>
				</section>
			) : (
				// No saved properties
				<section className="px-4 py-6">
					<div className="container-xl m-auto px-4 py-6 lg:container">
						<h1 className="mb-6 text-3xl font-bold">You have no saved properties</h1>
					</div>
				</section>
			)}
		</>
	)
}

export default SavedProperties

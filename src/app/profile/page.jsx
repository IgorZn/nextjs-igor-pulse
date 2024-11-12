'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/app/loading'
import { useSession } from 'next-auth/react'
import profileDefault from '@/assets/images/profile.png'
import ModalWindow from '@/components/ModalWindow'
import { toast } from 'react-toastify'

function ProfilePage(props) {
	const { data: session } = useSession()
	const profileImage = session?.user?.image
	const profileName = session?.user?.name
	const profileEmail = session?.user?.email

	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState(true)
	const [openModal, setOpenModal] = useState(false)

	const fetchProperties = async () => {
		if (session?.user?.id) {
			return fetch('/api/properties/user/' + session?.user?.id)
				.then(async data => {
					setProperties(await data.json())
				})
				.catch(e => toast.error(e.message))
		} else {
			return new Response(JSON.stringify([]), { status: 401 })
		}
	}

	const handleDelete = async id => {
		await fetch('/api/properties/' + id, {
			method: 'DELETE',
		})
		setOpenModal(!openModal)
		await fetchProperties()
	}

	useEffect(() => {
		fetchProperties()
		session?.user?.id && setLoading(false)
	}, [session])

	return (
		<>
			{/*Profile Section*/}
			<section className="bg-blue-50">
				<div className="container m-auto py-24">
					<div className="m-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
						<h1 className="mb-4 text-3xl font-bold">
							Your Profile
						</h1>
						<div className="flex flex-col md:flex-row">
							<div className="mx-20 mt-10 md:w-1/4">
								<div className="mb-4">
									<Image
										className="mx-auto size-32 rounded-full md:mx-0 md:size-48"
										src={profileImage || profileDefault}
										width={1800}
										height={1200}
										alt={'profileName'}
									/>
								</div>
								<h2 className="mb-4 text-2xl">
									<span className="block font-bold">
										Name:{' '}
									</span>{' '}
									{profileName}
								</h2>
								<h2 className="text-2xl">
									<span className="block font-bold">
										Email:{' '}
									</span>{' '}
									{profileEmail}
								</h2>
							</div>

							<div className="md:w-3/4 md:pl-4">
								<h2 className="mb-4 text-xl font-semibold">
									Your Listings
								</h2>
								{loading ? (
									<Loading />
								) : properties.length === 0 ? (
									<p>No properties found.</p>
								) : (
									properties.map(property => (
										<div
											key={property._id}
											className="mb-10">
											<Link
												href={
													'/properties/' +
													property._id
												}>
												<Image
													className="h-32 w-full rounded-md object-cover"
													src={
														property.images[0].startsWith(
															'http'
														)
															? property.images[0]
															: '/images/properties/' +
																property
																	.images[0]
													}
													width={1800}
													height={1200}
													alt="Image"
												/>
											</Link>
											<div className="mt-2">
												<p className="text-lg font-semibold">
													{property.name}
												</p>
												<p className="text-gray-600">
													Address:{' '}
													{property.location.street},{' '}
													{property.location.city}
												</p>
											</div>
											<div className="mt-2">
												<Link
													href={
														'/properties/' +
														property._id +
														'/edit'
													}
													className="mr-2 rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600">
													Edit
												</Link>
												<ModalWindow
													open={openModal}
													close={() =>
														setOpenModal(!openModal)
													}
													onClick={() =>
														handleDelete(
															property._id
														)
													}
													title={'Delete Property'}
													bodyText={
														'Are you sure you want to delete this property?'
													}
													cancelText={'Cancel'}
													confirmText={'Delete'}>
													<button
														className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
														onClick={() =>
															setOpenModal(
																prev => !prev
															)
														}
														type="button">
														Delete
													</button>
												</ModalWindow>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default ProfilePage

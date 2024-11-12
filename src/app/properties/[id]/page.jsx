'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/../utils/fetchMethods'
import {
	FaExclamationTriangle,
	FaArrowLeft,
	FaBed,
	FaBath,
	FaRulerCombined,
	FaCheck,
} from 'react-icons/fa'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import { FaXmark } from 'react-icons/fa6'
import Loading from '@/app/loading'
import PropertyImages from '@/components/PropertyImages'
import ButtonBookmark from '@/components/ButtonBookmark'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'

function Page(props) {
	const { id } = useParams()
	const [property, setProperty] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchProperty(id)
			.then(data => {
				if (data._id) {
					setProperty(data)
					setLoading(false)
				}
			})
			.catch(data => setProperty(null))
	}, [id])

	if (!property._id && !loading) {
		return (
			<section className="min-h-screen grow bg-blue-50">
				<div className="container m-auto max-w-2xl py-24">
					<div className="m-4 rounded-md border bg-white px-6 py-24 shadow-md md:m-0">
						<div className="flex justify-center">
							<FaExclamationTriangle className="text-8xl text-yellow-400" />
						</div>
						<div className="text-center">
							<h1 className="mb-2 mt-4 text-3xl font-bold">
								Property Not Found
							</h1>
							<p className="mb-10 text-xl text-gray-500">
								The property you are looking for does not exist.
							</p>
							<Link
								href="/properties"
								className="rounded bg-blue-700 px-6 py-4 font-bold text-white hover:bg-blue-800">
								Go Home
							</Link>
						</div>
					</div>
				</div>
				<div className="grow"></div>
			</section>
		)
	}

	return (
		<>
			{loading && <Loading />}
			{!loading && property._id && (
				<>
					{/*Property Header Image*/}
					<PropertyHeaderImage images={property.images} />

					{/*Go Back*/}
					<section>
						<div className="container m-auto p-6">
							<Link
								href="/properties"
								className="flex items-center text-blue-500 hover:text-blue-600">
								<FaArrowLeft className="mr-2" /> Back to
								Properties
							</Link>
						</div>
					</section>

					{/*Property Info*/}
					<section className="bg-blue-50">
						<div className="container m-auto px-6 py-10">
							<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
								<main>
									<div className="rounded-lg bg-white p-6 text-center shadow-md md:text-left">
										<div className="mb-4 text-gray-500">
											{property.type}
										</div>
										<h1 className="mb-4 text-3xl font-bold">
											{property.name}
										</h1>
										<div className="mb-4 flex justify-center align-middle text-gray-500 md:justify-start">
											<i className="fa-solid fa-location-dot mr-2 text-lg text-orange-700"></i>
											<p className="text-orange-700">
												{property.location.street},{' '}
												{property.location.city},{' '}
												{property.location.state},{' '}
												{property.location.zipcode}
											</p>
										</div>

										<h3 className="my-6 bg-gray-800 p-2 text-lg font-bold text-white">
											Rates & Options
										</h3>
										<div className="flex flex-col justify-around md:flex-row">
											<div className="mb-4 flex items-center justify-center border-b border-gray-200 pb-4 md:border-b-0 md:pb-0">
												<div className="mr-2 font-bold text-gray-500">
													Nightly
												</div>
												<div className="text-2xl font-bold">
													{property.rates?.nightly ? (
														<div className="text-2xl font-bold text-blue-500">
															$
															{property.rates?.nightly.toLocaleString()}
														</div>
													) : (
														<FaXmark
															className={
																'text-2xl text-red-500'
															}
														/>
													)}
												</div>
											</div>

											<div className="mb-4 flex items-center justify-center border-b border-gray-200 pb-4 md:border-b-0 md:pb-0">
												<div className="mr-2 font-bold text-gray-500">
													Weekly
												</div>
												{property.rates?.weekly ? (
													<div className="text-2xl font-bold text-blue-500">
														$
														{property.rates?.weekly.toLocaleString()}
													</div>
												) : (
													<FaXmark
														className={
															'text-2xl text-red-500'
														}
													/>
												)}
											</div>

											<div className="mb-4 flex items-center justify-center pb-4 md:pb-0">
												<div className="mr-2 font-bold text-gray-500">
													Monthly
												</div>
												{property.rates?.monthly ? (
													<div className="text-2xl font-bold text-blue-500">
														$
														{property.rates?.monthly.toLocaleString()}
													</div>
												) : (
													<FaXmark
														className={
															'text-2xl text-red-500'
														}
													/>
												)}
											</div>
										</div>
									</div>

									{/* Property Description & Details */}
									<div className="mt-6 rounded-lg bg-white p-6 shadow-md">
										<h3 className="mb-6 text-lg font-bold">
											Description & Details
										</h3>
										<div className="mb-4 flex justify-center gap-4 space-x-9 text-xl text-blue-500">
											<p>
												<FaBed
													className={'mr-2 inline'}
												/>
												{property.beds}
												<span className="hidden sm:inline">
													{' '}
													Beds
												</span>
											</p>
											<p>
												<FaBath
													className={'mr-2 inline'}
												/>
												{property.baths}
												<span className="hidden sm:inline">
													{' '}
													Baths
												</span>
											</p>
											<p>
												<FaRulerCombined
													className={'mr-2 inline'}
												/>
												{property.square_feet}
												<span className="hidden sm:inline">
													sqft
												</span>
											</p>
										</div>
										<p className="mb-4 text-gray-500">
											{property.description}
										</p>
									</div>

									{/* Amenities & Map */}
									<div className="mt-6 rounded-lg bg-white p-6 shadow-md">
										<h3 className="mb-6 text-lg font-bold">
											Amenities
										</h3>

										<ul className="grid list-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
											{property.amenities.map(
												(amenity, index) => (
													<li key={index}>
														<FaCheck className="mr-1 inline text-green-600"></FaCheck>{' '}
														{amenity}
													</li>
												)
											)}
										</ul>
									</div>

									<div className="mt-6 rounded-lg bg-white p-6 shadow-md">
										<div id="map">
											А тут будет нарисована карта 🤣🤣🤣
										</div>
									</div>
								</main>

								{/*Sidebar*/}
								<aside className="space-y-4">
									<ButtonBookmark property={property} />
									<ShareButtons property={property} />

									{/* Contact Form */}
									<PropertyContactForm property={property} />
								</aside>
							</div>
						</div>
					</section>

					{/* Property Images */}
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	)
}

export default Page

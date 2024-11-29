import React from 'react'
import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

function PropertyImages({ images }) {
	return (
		<>
			<Gallery>
				<section className={'bg-blue-50 p-4'}>
					<div className="container mx-auto">
						{images.length === 1 ? (
							<Image
								src={images[0].startsWith('http') ? images[0] : '/images/properties/' + images[0]}
								alt=""
								className="mx-auto h-[400px] rounded-xl object-cover"
								width="1800"
								height="1200"
							/>
						) : (
							<div className="grid grid-cols-2 gap-4">
								{images.map((image, index) => (
									<Item
										key={index}
										id={index}
										original={image.startsWith('http') ? image : '/images/properties/' + image}
										thumbnail="https://placekitten.com/80/60?image=1"
										width="1920"
										height="1200">
										{({ ref, open }) => (
											<div
												className={
													images.length === 3 && index === 2 ? 'col-span-3' : 'col-span-1'
												}>
												<Image
													ref={ref}
													onClick={open}
													className="h-[400px] w-full rounded-xl object-cover"
													alt=""
													width="1800"
													height="1200"
													src={
														image.startsWith('http') ? image : '/images/properties/' + image
													}
												/>
											</div>
										)}
									</Item>
								))}
							</div>
						)}
					</div>
				</section>
			</Gallery>
		</>
	)
}

export default PropertyImages

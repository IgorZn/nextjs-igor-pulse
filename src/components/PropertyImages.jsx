import React from 'react'
import Image from 'next/image'

function PropertyImages({ images }) {
	return (
		<>
			<section className={'bg-blue-50 p-4'}>
				<div className="container mx-auto">
					{images.length === 1 ? (
						<Image
							src={
								images[0].startsWith('http')
									? images[0]
									: '/images/properties/' + images[0]
							}
							alt=""
							className="object-cover h-[400px] mx-auto rounded-xl"
							width="1800"
							height="1200"
						/>
					) : (
						<div className="grid grid-cols-2 gap-4">
							{images.map((image, index) => (
								<div
									className={
										images.length === 3 && index === 2
											? 'col-span-3'
											: 'col-span-1'
									}
									key={index}>
									<Image
										src={
											image.startsWith('http')
												? image
												: '/images/properties/' + image
										}
										alt=""
										className="object-cover h-[400px] w-full rounded-xl"
										width="1800"
										height="1200"
										key={index}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default PropertyImages

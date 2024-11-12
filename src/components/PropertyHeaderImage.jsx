import React from 'react'
import Image from 'next/image'

function PropertyHeaderImage({ images }) {
	const [image] = images
	return (
		<>
			<section>
				<div className="container-xl m-auto">
					<div className="grid grid-cols-1">
						<Image
							src={
								image.startsWith('http')
									? image
									: '/images/properties/' + image
							}
							alt=""
							className="h-[400px] w-full object-cover"
							width="1800"
							height="1200"
						/>
					</div>
				</div>
			</section>
		</>
	)
}

export default PropertyHeaderImage

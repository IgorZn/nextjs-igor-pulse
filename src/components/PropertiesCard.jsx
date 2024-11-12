import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	FaBath,
	FaBed,
	FaMoneyBill,
	FaRulerCombined,
	FaMapMarker,
} from 'react-icons/fa'

function PropertiesCard(props) {
	const getRate = rate => {
		for (rate of [...Object.keys(props.rates)]) {
			if (rate === 'monthly') {
				return `${props.rates[rate].toLocaleString()}/mo`
			}
			if (rate === 'weekly') {
				return `${props.rates[rate].toLocaleString()}/wk`
			}
			if (rate === 'nightly') {
				return `${props.rates[rate].toLocaleString()}/night`
			}
		}
	}

	return (
		<>
			<div className="rounded-xl shadow-md relative">
				<Image
					src={
						props.images[0].startsWith('http')
							? props.images[0]
							: '/images/properties/' + props.images[0]
					}
					alt=""
					width={'500'}
					height={'50'}
					className="w-full h-auto rounded-t-xl"
				/>
				<div className="p-4">
					<div className="text-left md:text-center lg:text-left mb-6">
						<div className="text-gray-600">{props.type}</div>
						<h3 className="text-xl font-bold">{props.name}</h3>
					</div>
					<h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
						${getRate(props.rates)}
					</h3>

					<div className="flex justify-center gap-4 text-gray-500 mb-4">
						<p>
							<FaBed className={'inline mr-2'} /> {props.beds}
							<span className="md:hidden lg:inline"> Beds</span>
						</p>
						<p>
							<FaBath className={'inline mr-2'} /> {props.baths}
							<span className="md:hidden lg:inline"> Baths</span>
						</p>
						<p>
							<FaRulerCombined className={'inline mr-2'} />{' '}
							{props.square_feet}
							<span className="md:hidden lg:inline">sqft</span>
						</p>
					</div>

					<div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
						{props.rates.nightly && (
							<p>
								<FaMoneyBill className={'inline mr-2'} />{' '}
								Nightly
							</p>
						)}
						{props.rates.weekly && (
							<p>
								<FaMoneyBill className={'inline mr-2'} /> Weekly
							</p>
						)}
						{props.rates.monthly && (
							<p>
								<FaMoneyBill className={'inline mr-2'} />{' '}
								Monthly
							</p>
						)}
					</div>

					<div className="border border-gray-100 mb-5"></div>

					<div className="flex flex-col lg:flex-row justify-between mb-4">
						<div className="flex align-middle gap-2 mb-4 lg:mb-0">
							<FaMapMarker
								className={'inline mt-1 text-orange-500'}
							/>
							<span className="text-orange-700">
								{' '}
								{props.location.city} {props.location.state}
							</span>
						</div>
						<Link
							href={'/properties/' + props._id}
							className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
							Details
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default PropertiesCard

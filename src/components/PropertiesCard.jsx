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
			<div className="relative rounded-xl shadow-md">
				<Image
					src={
						props.images[0].startsWith('http')
							? props.images[0]
							: '/images/properties/' + props.images[0]
					}
					alt=""
					width={'500'}
					height={'50'}
					className="h-auto w-full rounded-t-xl"
				/>
				<div className="p-4">
					<div className="mb-6 text-left md:text-center lg:text-left">
						<div className="text-gray-600">{props.type}</div>
						<h3 className="text-xl font-bold">{props.name}</h3>
					</div>
					<h3 className="absolute right-[10px] top-[10px] rounded-lg bg-white px-4 py-2 text-right font-bold text-blue-500 md:text-center lg:text-right">
						${getRate(props.rates)}
					</h3>

					<div className="mb-4 flex justify-center gap-4 text-gray-500">
						<p>
							<FaBed className={'mr-2 inline'} /> {props.beds}
							<span className="md:hidden lg:inline"> Beds</span>
						</p>
						<p>
							<FaBath className={'mr-2 inline'} /> {props.baths}
							<span className="md:hidden lg:inline"> Baths</span>
						</p>
						<p>
							<FaRulerCombined className={'mr-2 inline'} />{' '}
							{props.square_feet}
							<span className="md:hidden lg:inline">sqft</span>
						</p>
					</div>

					<div className="mb-4 flex justify-center gap-4 text-sm text-green-900">
						{props.rates.nightly && (
							<p>
								<FaMoneyBill className={'mr-2 inline'} />{' '}
								Nightly
							</p>
						)}
						{props.rates.weekly && (
							<p>
								<FaMoneyBill className={'mr-2 inline'} /> Weekly
							</p>
						)}
						{props.rates.monthly && (
							<p>
								<FaMoneyBill className={'mr-2 inline'} />{' '}
								Monthly
							</p>
						)}
					</div>

					<div className="mb-5 border border-gray-100"></div>

					<div className="mb-4 flex flex-col justify-between lg:flex-row">
						<div className="mb-4 flex gap-2 align-middle lg:mb-0">
							<FaMapMarker
								className={'mt-1 inline text-orange-500'}
							/>
							<span className="text-orange-700">
								{' '}
								{props.location.city} {props.location.state}
							</span>
						</div>
						<Link
							href={'/properties/' + props._id}
							className="h-[36px] rounded-lg bg-blue-500 px-4 py-2 text-center text-sm text-white hover:bg-blue-600">
							Details
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default PropertiesCard

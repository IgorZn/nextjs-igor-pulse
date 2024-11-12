import React from 'react'
import Link from 'next/link'

function InfoBox({
	heading,
	bgColor = 'bg-gray-100',
	textColor = 'text-gray-800',
	buttonInfo,
	children,
}) {
	return (
		<>
			<div className={`${bgColor} rounded-lg p-6 shadow-md`}>
				<h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
				<p className="mb-4 mt-2">{children}</p>
				<Link
					href={buttonInfo.link}
					className={`inline-block ${buttonInfo.bgColor} rounded-lg px-4 py-2 text-white hover:opacity-80`}>
					{buttonInfo.text}
				</Link>
			</div>
		</>
	)
}

export default InfoBox

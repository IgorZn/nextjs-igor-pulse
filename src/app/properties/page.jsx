'use client'
import React, { useEffect } from 'react'
import PropertiesCard from '@/components/PropertiesCard'
import { fetchProperties } from '@/../utils/fetchMethods'
import Pagination from '@/components/Pagination'

const PropertiesPage = props => {
	const [page, setPage] = React.useState(1)
	const [pageSize, setPageSize] = React.useState(6)
	const [total, setTotal] = React.useState(0)
	const [properties, setProperties] = React.useState([])

	useEffect(() => {
		fetchProperties(page, pageSize).then(({ properties, total }) => {
			setProperties(properties)
			setTotal(total)
		})
	}, [page, pageSize])

	return (
		<>
			<section className={'px-4 py-6'}>
				{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
				<div className={'container-xl m-auto px-4 py-6 lg:container'}>
					{properties.length === 0 ? (
						<p>No properties found.</p>
					) : (
						<div className={'grid grid-cols-1 gap-6 lg:grid-cols-3'}>
							{properties.map(property => (
								<PropertiesCard key={property._id} {...property} />
							))}
						</div>
					)}
				</div>
			</section>
			<Pagination page={page} setPage={setPage} total={total} pageSize={pageSize} setPageSize={setPageSize} />
		</>
	)
}

export default PropertiesPage

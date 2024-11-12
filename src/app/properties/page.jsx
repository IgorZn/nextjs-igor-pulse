import PropertiesCard from '@/components/PropertiesCard'
import { fetchProperties } from '@/../utils/fetchMethods'

const PropertiesPage = async props => {
	const properties = await fetchProperties()
	return (
		<>
			<section className={'px-4 py-6'}>
				{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
				<div className={'container-xl m-auto px-4 py-6 lg:container'}>
					{properties.length === 0 ? (
						<p>No properties found.</p>
					) : (
						<div
							className={'grid grid-cols-1 gap-6 lg:grid-cols-3'}>
							{properties.map(property => (
								<PropertiesCard
									key={property._id}
									{...property}
								/>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default PropertiesPage

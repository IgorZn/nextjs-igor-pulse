'use client'
import { ScaleLoader } from 'react-spinners'

function Loading(props) {
	const override = {
		display: 'block',
		margin: '100px auto',
	}

	return (
		// eslint-disable-next-line tailwindcss/no-custom-classname
		<div className="container-xl m-auto text-center lg:container">
			<ScaleLoader
				loading={true}
				cssOverride={override}
				size={150}
				aria-label="Loading Spinner"
			/>
		</div>
	)
}

export default Loading

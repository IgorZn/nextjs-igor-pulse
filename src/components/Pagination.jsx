import React from 'react'

function Pagination({ page, setPage, total, pageSize, setPageSize }) {
	const totalPages = Math.ceil(total / pageSize)
	return (
		<>
			{/*Pagination*/}
			<section className="container mx-auto my-8 flex items-center justify-center">
				<button
					onClick={() => (page === 1 ? setPage(1) : setPage(page - 1))}
					disabled={page === 1}
					className={`mr-2 rounded border border-gray-300 px-2 py-1 ${page === 1 ? 'text-gray-400' : ''}`}>
					Previous
				</button>
				<span className="mx-2">
					Page {page} of {totalPages}
				</span>
				<button
					onClick={() => (page === total ? setPage(total) : setPage(page + 1))}
					className={`ml-2 rounded border border-gray-300 px-2 py-1 ${page === totalPages ? 'text-gray-400' : ''}`}
					disabled={page === totalPages}>
					Next
				</button>
			</section>
		</>
	)
}

export default Pagination

import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'

function Custom404(props) {
    return (
        <section className="min-h-screen grow bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <div className="flex justify-center">
                        <FaExclamationTriangle className="text-8xl text-yellow-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="mb-2 mt-4 text-3xl font-bold">
                            Page Not Found
                        </h1>
                        <p className="text-gray-500 text-xl mb-10">
                            The page you are looking for does not exist.
                        </p>
                        <Link
                            href="/"
                            className="rounded bg-blue-700 px-6 py-4 font-bold text-white hover:bg-blue-800">
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-grow"></div>
        </section>
    )
}

export default Custom404

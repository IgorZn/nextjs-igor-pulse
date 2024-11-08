'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useParams} from "next/navigation";
import {fetchProperty} from "@/../utils/fetchMethods";
import {
    FaExclamationTriangle,
    FaShare,
    FaBookmark,
    FaPaperPlane,
    FaArrowLeft,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaCheck
} from "react-icons/fa";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import {FaXmark} from "react-icons/fa6";
import Loading from "@/app/loading";
import PropertyImages from "@/components/PropertyImages";

function Page(props) {
    const {id} = useParams();
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty(id)
            .then((data) => {
                if(data._id) {
                    setProperty(data)
                    setLoading(false)
                }
            })
            .catch(data => setProperty(null))
    }, [id]);


    if(!property._id && !loading) {
        return (
            <section className="bg-blue-50 min-h-screen flex-grow">
                <div className="container m-auto max-w-2xl py-24">
                    <div
                        className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0"
                    >
                        <div className="flex justify-center">
                            <FaExclamationTriangle className="text-8xl text-yellow-400" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mt-4 mb-2">Property Not Found</h1>
                            <p className="text-gray-500 text-xl mb-10">
                                The property you are looking for does not exist.
                            </p>
                            <Link
                                href="/properties"
                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
                            >Go Home</Link
                            >
                        </div>
                    </div>
                </div>
                <div className="flex-grow"></div>
            </section>
        )
    }

    return (
        <>
            {loading && <Loading />}
            {!loading && property._id && (
                <>
                    {/*Property Header Image*/}
                    <PropertyHeaderImage images={property.images} />

                    {/*Go Back*/}
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
                                <FaArrowLeft className="mr-2" /> Back to Properties
                            </Link>
                        </div>
                    </section>

                    {/*Property Info*/}
                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                <main>
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                        <div className="text-gray-500 mb-4">{property.type}</div>
                                        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                                        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                            <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                                            <p className="text-orange-700">
                                                {property.location.street}, {property.location.city}, {property.location.state}, {property.location.zipcode}
                                            </p>
                                        </div>

                                        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                                            Rates & Options
                                        </h3>
                                        <div className="flex flex-col md:flex-row justify-around">

                                            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                                                <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                                                <div className="text-2xl font-bold">
                                                    {property.rates?.nightly
                                                        ? (<div className="text-2xl font-bold text-blue-500">${property.rates?.nightly.toLocaleString()}</div>)
                                                        : (<FaXmark className={'text-2xl text-red-500'}/>)}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                                                <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                                                {property.rates?.weekly
                                                    ? (<div className="text-2xl font-bold text-blue-500">${property.rates?.weekly.toLocaleString()}</div>)
                                                    : (<FaXmark className={'text-2xl text-red-500'}/>)}
                                            </div>

                                            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                                                <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                                                {property.rates?.monthly
                                                    ? (<div className="text-2xl font-bold text-blue-500">${property.rates?.monthly.toLocaleString()}</div>)
                                                    : (<FaXmark className={'text-2xl text-red-500'}/>)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Property Description & Details */}
                                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                                        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                                            <p>
                                                <FaBed className={'inline mr-2'}/>{property.beds}
                                                <span className="hidden sm:inline"> Beds</span>
                                            </p>
                                            <p>
                                                <FaBath className={'inline mr-2'}/>{property.baths}
                                                <span className="hidden sm:inline"> Baths</span>
                                            </p>
                                            <p>
                                                <FaRulerCombined className={'inline mr-2'}/>{property.square_feet}
                                                <span className="hidden sm:inline">sqft</span>
                                            </p>
                                        </div>
                                        <p className="text-gray-500 mb-4">
                                            {property.description}
                                        </p>
                                    </div>

                                    {/* Amenities & Map */}
                                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <h3 className="text-lg font-bold mb-6">Amenities</h3>

                                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                                            {property.amenities.map((amenity, index) => (
                                                <li key={index}>
                                                    <FaCheck className="inline text-green-600 mr-1"></FaCheck> {amenity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <div id="map">А тут будет нарисована карта 🤣🤣🤣</div>
                                    </div>
                                </main>

                                {/*Sidebar*/}
                                <aside className="space-y-4">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                                        <FaBookmark className={"mr-2"} /> Bookmark Property
                                    </button>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                                        <FaShare className={"mr-2"} /> Share Property
                                    </button>

                                    {/* Contact Form */}
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                                        <form>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-gray-700 text-sm font-bold mb-2'
                                                    htmlFor='name'>
                                                    Name:
                                                </label>
                                                <input
                                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter your name'
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="email">
                                                    Email:
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-gray-700 text-sm font-bold mb-2'
                                                    htmlFor='phone'>
                                                    Phone:
                                                </label>
                                                <input
                                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    id='phone'
                                                    type='text'
                                                    placeholder='Enter your phone number'
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="message">
                                                    Message:
                                                </label>
                                                <textarea
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                                                    id="message"
                                                    placeholder="Enter your message"
                                                ></textarea>
                                            </div>
                                            <div>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                                                    type="submit">
                                                    <FaPaperPlane className={"mr-2"} /> Send Message
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>

                    {/* Property Images */}
                    <PropertyImages images={property.images} />
                </>
            )}
        </>
    )
}

export default Page;
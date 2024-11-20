import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { sendMessage } from '../../utils/fetchMethods'
import { toast } from 'react-toastify'

function PropertyContactForm({ property }) {
	const dataSession = useSession()

	const [formSubmitted, setFormSubmitted] = useState(!(dataSession.status === 'authenticated'))
	const [fields, setFields] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
		property: '',
		receiver: '',
		sender: '',
	})

	useEffect(() => {
		setFields({
			...fields,
			property: property._id,
			receiver: property.owner,
			sender: dataSession?.data?.user?.id,
		})
	}, [property, dataSession])

	const handleChange = e => {
		e.preventDefault()
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setFields({
			...fields,
			receiver: property.owner,
			property: property._id,
			sender: dataSession?.data?.user?.id,
		})

		console.log(fields)
		await sendMessage(fields).then(async res => {
			res.status === 200 ? toast.success('Message sent') : toast.warn(await res.json().then(data => data.message))
			res.status === 200 && setFormSubmitted(true)
		})
	}

	return (
		<>
			{/* Contact Form */}
			<div className="rounded-lg bg-white p-6 shadow-md">
				{!formSubmitted ? (
					<h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
				) : (
					<h3 className="mb-6 text-xl font-bold text-gray-800">
						Please authenticate to contact the property owner
					</h3>
				)}
				<form onSubmit={handleSubmit} onChange={handleChange}>
					<div className="mb-4">
						<label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
							Name:
						</label>
						<input
							name={'name'}
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
							id="name"
							type="text"
							placeholder="Enter your name"
							required
							disabled={formSubmitted}
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
							Email:
						</label>
						<input
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
							id="email"
							name={'email'}
							type="email"
							placeholder="Enter your email"
							required
							disabled={formSubmitted}
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="phone">
							Phone:
						</label>
						<input
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
							id="phone"
							name={'phone'}
							type="text"
							placeholder="Enter your phone number"
							disabled={formSubmitted}
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="message">
							Message:
						</label>
						<textarea
							className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
							id="message"
							name={'message'}
							disabled={formSubmitted}
							placeholder="Enter your message"></textarea>
					</div>
					<div>
						<button
							disabled={formSubmitted}
							className={
								'focus:shadow-outline flex w-full items-center justify-center rounded-full px-4 py-2 font-bold text-white focus:outline-none' +
								(formSubmitted ? ' bg-gray-400 hover:bg-gray-500' : ' bg-blue-500 hover:bg-blue-600')
							}
							type="submit">
							<FaPaperPlane className={'mr-2'} /> Send Message
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default PropertyContactForm

import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading'
import Link from 'next/link'
import { markMessageAsRead } from '../../utils/fetchMethods'
import { toast } from 'react-toastify'

function Messages(props) {
	const [messages, setMessages] = useState([])
	const [newMessages, setNewMessages] = useState([])
	const [readMessages, setReadMessages] = useState([])
	const [loading, setLoading] = useState(true)
	const [isRead, setIsRead] = useState(false)
	const [isReadCount, setIsReadCount] = useState(0)
	const [filterStatus, setFilterStatus] = useState(false)

	const handleIsReadMessage = async e => {
		return markMessageAsRead(e.target.id).then(res => {
			setIsRead(!isRead)
			setMessages(() => messages.filter(message => message._id !== e.target.id))
			toast.success('Mark as read')
		})
	}

	const handleDeleteMessage = async e => {
		return fetch(`/api/messages/${e.target.id}`, { method: 'DELETE' }).then(res => {
			setMessages(() =>
				messages.filter(message => message._id !== e.target.id).filter(message => message.isDeleted === false)
			)
			toast.success('Message deleted')
		})
	}

	const handleOpenRead = () => {
		setReadMessages(messages.filter(item => item.isRead === true).filter(item => item.isDeleted === false))
		setFilterStatus(true)
	}

	const handleOpenNew = () => {
		setNewMessages(messages.filter(item => item.isRead === false))
		setFilterStatus(false)
	}

	useEffect(() => {
		fetch('/api/messages')
			.then(async data => await data.json())
			.then(json => {
				console.log(json.messages)
				setMessages(json.messages.filter(item => item.isDeleted === false))
				setIsReadCount(
					json.messages.filter(item => item.isRead === true).filter(item => item.isDeleted === true).length
				)
				setLoading(!loading)
			})
	}, [])

	return (
		<>
			<div className="container m-auto max-w-6xl py-10">
				<div className="flex flex-col justify-start gap-2 md:flex-row">
					<div
						onClick={handleOpenNew}
						className="m-4 rounded-md border bg-amber-50 px-6 py-8 shadow-md md:m-0">
						<h1 className="mb-4 text-3xl font-bold">New Messages</h1>
						<p className="text-gray-500">
							You have {messages.filter(item => item.isRead === false).length} unread messages
						</p>
					</div>
					<div
						onClick={handleOpenRead}
						className="m-4 rounded-md border bg-green-50 px-6 py-8 shadow-md md:m-0">
						<h1 className="mb-4 text-3xl font-bold">Read Messages</h1>
						<p className="text-gray-500">You have {isReadCount} messages</p>
					</div>
				</div>
			</div>

			{loading ? (
				<Loading />
			) : messages.filter(item => item.isRead === filterStatus).filter(item => item.isDeleted === false).length >
			  0 ? (
				<section className="bg-blue-50">
					<div className="container m-auto max-w-6xl py-24">
						<div className="m-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
							<h1 className="mb-4 text-3xl font-bold">Your Messages</h1>
							{messages
								.filter(item => item.isRead === filterStatus)
								.map(message => (
									<div className="space-y-4" key={message._id}>
										<div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
											<div className={'absolute right-2 top-1 rounded bg-amber-400 p-2'}>New</div>
											<h2 className="mb-4 text-xl">
												<span className="font-bold">Property Inquiry:</span>
												{message.property.name}
											</h2>
											<p className="text-gray-700">{message.property.description}</p>

											<ul className="mt-4">
												<li>
													<strong>Name:</strong> {message.sender.name}
												</li>

												<li>
													<strong>Reply Email:</strong>
													<Link href="mailto:recipient@example.com" className="text-blue-500">
														{message.sender.email}
													</Link>
												</li>
												<li>
													<strong>Reply Phone:</strong>
													<a href="tel:123-456-7890" className="text-blue-500">
														{message.sender?.phone}
													</a>
												</li>
												<li>
													<strong>Received:</strong>
													{message.sender.createdAt}
												</li>
											</ul>
											{!filterStatus && (
												<button
													id={message._id}
													onClick={handleIsReadMessage}
													className="mr-3 mt-4 rounded-md bg-blue-500 px-3 py-1 text-white">
													Mark As Read
												</button>
											)}

											<button
												id={message._id}
												onClick={handleDeleteMessage}
												className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white">
												Delete
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</section>
			) : (
				<section className="bg-blue-50">
					<div className="container m-auto max-w-6xl py-24">
						<div className="m-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
							<h1 className="mb-4 text-3xl font-bold">You have no new messages</h1>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default Messages

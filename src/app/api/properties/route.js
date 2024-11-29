import { PropertyModel } from '@/../models/Property'
import connectDB from '@/../utils/mongoDB'
import { NextResponse } from 'next/server'
import { getSessionUser } from '@/../utils/getSessionUser'
import { cloudinaryConfig } from '@/../utils/cloudinary'
import { v2 as cloudinary } from 'cloudinary'

export const GET = async request => {
	await connectDB()
	const searchParams = request.nextUrl.searchParams
	const page = searchParams.get('page') || 1
	const pageSize = searchParams.get('pageSize') || 3

	const skip = page * pageSize - pageSize
	const limit = pageSize
	const total = await PropertyModel.countDocuments({ isEnabled: true })

	return await PropertyModel.find({ isEnabled: true })
		.skip(skip)
		.limit(limit)
		.then(data => {
			return NextResponse.json({ properties: data, total }, { status: 200 })
		})
		.catch(error => {
			return NextResponse.json({ message: error.message }, { status: 500 })
		})
}

export const POST = async request => {
	await connectDB()
	await cloudinaryConfig()

	const formData = await request.formData()

	// Получаем сессию
	const { userId, user } = await getSessionUser()

	if (!userId || !user) {
		return NextResponse.json({ message: 'User ID or User not found' }, { status: 401 })
	}

	// console.log('getServerSession>>>', user)

	const images = formData.getAll('images')
	const amenities = formData.getAll('amenities')

	// Upload images to Cloudinary
	const uploadedImages = await Promise.all(
		images.map(async image => {
			const buffer = Buffer.from(await image.arrayBuffer()).toString('base64')
			const res = await cloudinary.uploader.upload('data:image/png;base64,' + buffer, {
				asset_folder: 'pulse-images',
			})
			return res.secure_url
		})
	)

	console.log('uploadedImages>>>', uploadedImages)

	const propertyObj = {
		name: formData.get('name'),
		type: formData.get('type'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		amenities,
		rates: {
			weekly: formData.get('rates.weekly'),
			nightly: formData.get('rates.nightly'),
			monthly: formData.get('rates.monthly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
		images: uploadedImages,
		owner: userId,
	}

	// console.log('propertyObj>>>', propertyObj)

	// return NextResponse.json({message: 'Success'}, { status: 201 })
	return await PropertyModel.create(propertyObj)
		.then(data => {
			return NextResponse.redirect(new URL(`/properties/${data._id}`, request.url))
		})
		.catch(error => console.log(error))
}

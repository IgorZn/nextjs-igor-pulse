import {PropertyModel} from "@/../models/Property";
import connectDB from "../../../../utils/mongoDB";
import {NextRequest, NextResponse} from "next/server";



export const GET = async (request) => {
    await connectDB()
    return await PropertyModel.find({})
        .then(data => {
            return new Response(JSON.stringify(data), {
                status: 200
            })
        })
        .catch(error => {
            return new Response('Internal Server Error', { status: 500 })
        })
};

export const POST = async (request) => {
    await connectDB();
    const formData = await request.formData();
    // console.log(formData)

    const images = formData.getAll('images');
    const amenities = formData.getAll('amenities');

    const propertyObj = {
        name: formData.get('name'),
        description: formData.get('description'),
        images,
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
    };

    // console.log('propertyObj>>>', propertyObj)

    // return await PropertyModel
    //     .create(propertyObj)
    //     .then(data => {
    //         return NextResponse.json({message: 'Success'}, { status: 201 })
    //     })
    //     .catch(error => console.log(error));

}
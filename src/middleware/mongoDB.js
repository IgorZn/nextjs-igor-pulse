import {mongoose} from "mongoose";

const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URI)
        .then((conn) => {
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        })

    // try {
    //     mongoose.set('strictQuery', true)
    //     const conn = await mongoose.connect(process.env.MONGO_URI)
    //
    //     console.log(`MongoDB Connected: ${conn.connection.host}`)
    //     return conn
    // } catch (error) {
    //     console.error(`Error: ${error.message}`)
    //     process.exit(1)
    // }
}

export default connectDB
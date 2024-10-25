import mongoose from "mongoose";

if(!process.env.MONGO_URI) throw new Error("Please define the MONGO_URI environment variable inside .env.local")

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

const connectDB = async () => {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    return await cached.promise
        .catch((error) => {
            console.error(`Error: ${error.message}`)
            throw error
        })

    // return await mongoose.connect(process.env.MONGO_URI)
    //     .then((conn) => {
    //         console.log(`MongoDB Connected: ${conn.connection.host}`)
    //     })
    //     .catch((error) => {
    //         console.error(`Error: ${error.message}`)
    //         process.exit(1)
    //     })
}

export default connectDB
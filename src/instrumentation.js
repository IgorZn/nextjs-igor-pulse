import connectDB from "@/middleware/mongoDB";

export const register = async () => {
    await connectDB()
}
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    bookmarks: {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
}, {timestamps: true})

export const User =
    mongoose.models.User || mongoose.model("User", userSchema)
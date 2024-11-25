import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		property: {
			type: Schema.Types.ObjectId,
			ref: 'Property',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Please enter a name for the message'],
		},
		email: {
			type: String,
			required: [true, 'Please enter an email for the message'],
		},
		phone: {
			type: String,
		},
		isRead: {
			type: Boolean,
			default: false,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

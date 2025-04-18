import { Schema, Types, model } from "mongoose";
import {chatTypes} from "../common/entityConstraints.js";

const chatSchema = new Schema({
	name: String,
	updatedAt: {
		type: Date,
		required: true,
	},
	type: {
		type: String,
		enum: Object.values(chatTypes),
	},
	participants: [
		{
			_id: false,
			nickname: String,
			participant: {
				type: Types.ObjectId,
				ref: "User",
			},
		},
	],
	messages: [
		{
			_id: false,
			type: Types.ObjectId,
			ref: "Message",
		},
	],
});

const chatModel = model("Chat", chatSchema);

export default chatModel;

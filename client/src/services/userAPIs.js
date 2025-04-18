import { host } from "../common/appConstants.js";
import request from "../utils/request.js";

export async function fetchUsers(substring) {
	try {
		if (!substring) {
			return [];
		}

		const { response, payload } = await request.get(
			`${host}/user/get-users-by-username`,
			{
				usernameSubstr: substring,
				exclude: true,
			}
		);

		const { data } = payload;

		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function sendFriendRequest(
	senderId,
	receiverId,
	{ enqueueError, enqueueInfo }
) {
	try {
		const { response, payload } = await request.post(
			`${host}/user/send-friend-request`,
			{
				senderId,
				receiverId,
			}
		);

		const { data } = payload;

		if (!response.ok) {
			enqueueError(payload.message);
			return;
		}

		enqueueInfo(data);
	} catch (err) {
		enqueueError(err);
		console.log(err);
	}
}

export async function unfriend(
	senderId,
	receiverId,
	{ enqueueError, enqueueInfo }
) {
	try {
		const { response, payload } = await request.post(
			`${host}/user/unfriend`,
			{
				senderId,
				receiverId,
			}
		);

		const { data } = payload;

		if (!response.ok) {
			enqueueError(payload.message);
		}

		enqueueInfo(data);
	} catch (err) {
		enqueueError(err);
		console.log(err);
	}
}

export async function acceptFriendRequest(
	senderId,
	receiverId,
	{ enqueueError, enqueueInfo }
) {
	try {
		const { response, payload } = await request.post(
			`${host}/user/accept-friend-request`,
			{
				senderId,
				receiverId,
			}
		);

		const { data } = payload;

		if (!response.ok) {
			enqueueError("Failed to accept friend request.");
		}

		enqueueInfo(data);
	} catch (err) {
		enqueueError(err);
		console.log(err);
	}
}

export async function declineFriendRequest(
	senderId,
	receiverId,
	{ enqueueError, enqueueInfo }
) {
	try {
		const { response, payload } = await request.post(
			`${host}/user/decline-friend-request`,
			{
				senderId,
				receiverId,
			}
		);

		const { data } = payload;

		if (!response.ok && enqueueError) {
			enqueueError("Failed to decline friend request.");
		}

		enqueueInfo(data);
	} catch (err) {
		enqueueError(err);
		console.log(err);
	}
}

export async function cancelFriendRequest(
	senderId,
	receiverId,
	{ enqueueError, enqueueInfo }
) {
	try {
		const { response, payload } = await request.post(
			`${host}/user/cancel-friend-request`,
			{
				senderId,
				receiverId,
			}
		);

		const { data } = payload;

		if (!response.ok) {
			enqueueError(payload.message);
			return;
		}

		enqueueInfo(data);
	} catch (err) {
		enqueueError(err);
		console.log(err);
	}
}

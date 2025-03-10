import commentModel from "../models/Comment.js";
import postModel from "../models/Post.js";
import userModel from "../models/User.js";

export default {
	async getUserPosts(req) {
		const identifier = req.query.userId;

		const userObj = await userModel
			.findById(identifier)
			.populate("posts")
			.lean();

		if (!userObj) {
			throw new Error("User not found!");
		}

		const { posts, ...user } = userObj;
		return { user, posts };
	},
	async createPost(req) {
		const { userId, content, images } = req.body;
		if (req.user?.id != userId) {
			throw new Error("Unauthorized");
		}

		const post = {
			date: Date.now(),
			user: userId,
			content,
			images,
		};

		const newPostId = await postModel.create(post);

		await userModel.findByIdAndUpdate(userId, {
			$push: { posts: newPostId },
		});

		return "Successfully created post";
	},
	async getPost(req) {
		const { postId } = req.query;

		const post = await postModel
			.findById(postId)
			.populate("user")
			.populate("images")
			.populate({
				path: "comments",
				populate: { path: "user" },
			})
			.populate("likes")
			.lean();

		if (!post) {
			throw new Error("Could not find post!");
		}

		return post;
	},
};

import photoModel from "../models/Photo.js";
import userModel from "../models/User.js";

const photoService = {
	async uploadPhotos(req) {
		const { userId, imageUrls } = req.body;

		if (userId != req.user?.id) {
			throw new Error("Unauthorized");
		}

		if (!imageUrls) throw new Error("Image url is required!");

		try {
			for (const imageUrl of imageUrls) {
				const photo = await photoModel.create({
					url: imageUrl,
					date: Date.now(),
					user: userId,
				});

				await userModel.findByIdAndUpdate(userId, {
					$push: {
						photos: photo._id,
					},
				});
			}
		} catch (err) {
			console.log(err);
			throw new Error("Something went wrong saving photo!");
		}

		return "Successfully saved image!";
	},
	async removePhoto(req) {
		const { userId, photoId } = req.body;

		if (userId != req.user?.id) {
			throw new Error("Unauthorized");
		}

		if (!photoId) throw new Error("Photo id was not found!");

		try {
			await userModel.findByIdAndUpdate(userId, {
				$pull: {
					photos: photoId,
				},
			});
		} catch (err) {
			console.log(err);
			throw new Error("Something went wrong removing photo!");
		}

		return "Successfully removed photo.";
	},
	async getUserPhotos(req) {
		let { userId, excluded } = req.query;
		excluded = Array.isArray(excluded) ? excluded : [excluded];
		
		if (!userId) {
			throw new Error("User id missing!");
		}

		const user = await userModel.findById(userId).populate("photos").lean();

		if (!user) {
			throw new Error("User not found!");
		}

		if (excluded.length > 0) {
			user.photos = user.photos.filter((p) =>
				excluded.some((e) => e != p._id)
			);
		}

		return user.photos;
	},
};

export default photoService;

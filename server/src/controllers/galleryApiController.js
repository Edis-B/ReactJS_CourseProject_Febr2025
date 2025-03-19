import { Router } from "express";
import galleryService from "../services/galleryService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const galleryApiController = Router();

galleryApiController.get("/get-user-galleries", async (req, res) => {
	try {
		const result = await galleryService.getUserGalleries(req);
		res.json(result);
	} catch (err) {
		const errMessage = getErrorMessage(err);
		res.status(400).json(errMessage);
	}
});

galleryApiController.post("/create-gallery", async (req, res) => {
	try {
		const result = await galleryService.createGallery(req);
		res.json(result);
	} catch (err) {
		const errMessage = getErrorMessage(err);
		res.status(400).json(errMessage);
	}
});

galleryApiController.delete("/delete-gallery", async (req, res) => {
	try {
		const result = await galleryService.deleteGallery(req);
		res.json(result);
	} catch (err) {
		const errMessage = getErrorMessage(err);
		res.status(400).json(errMessage);
	}
});

export default galleryApiController;

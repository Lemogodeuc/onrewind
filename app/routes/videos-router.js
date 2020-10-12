const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// CRUD for videos
router.get("/", videoController.getAll);
router.get("/:offset(\\d+)/:limit(\\d+)", videoController.getAllWithPagination);
router.get("/:id(\\d+)", videoController.getOne);
router.post("/", videoController.createOne);
router.put("/:id(\\d+)", videoController.updateOne);
router.delete("/:id(\\d+)", videoController.deleteOne);

// Add or Remove tags from Videos
router.post("/:videoId(\\d+)/tags/:tagId(\\d+)", videoController.addTag);
router.delete("/:videoId(\\d+)/tags/:tagId(\\d+)", videoController.removeTag);

module.exports = router;

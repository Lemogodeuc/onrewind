const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagController");

router.post("/", tagsController.createOne);
router.delete("/:id(\\d+)", tagsController.deleteOne);
router.get("/:id(\\d+)/videos", tagsController.getVideosByTagId);
module.exports = router;

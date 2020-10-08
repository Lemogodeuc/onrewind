const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagController");

router.post("/", tagsController.createOne);
router.delete("/:id(\\d+)", tagsController.deleteOne);

module.exports = router;

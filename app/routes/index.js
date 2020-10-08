const express = require("express");
const router = express.Router();

const videoRouter = require("./videos-router");
const tagRouter = require("./tags-router");

const notFoundMiddleware = require("../middlewares/notFound");
const errorMiddleware = require("../middlewares/error");

router.use("/videos", videoRouter);
router.use("/tags", tagRouter);
router.use(notFoundMiddleware, errorMiddleware);

module.exports = router;

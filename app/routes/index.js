const express = require("express");
const router = express.Router();

const notFoundMiddleware = require("../middlewares/notFound");
const errorMiddleware = require("../middlewares/error");

const videoRouter = require("./videos-router");
const tagRouter = require("./tags-router");

router.use("/videos", videoRouter);
router.use("/tags", tagRouter);

router.use(notFoundMiddleware, errorMiddleware);

module.exports = router;

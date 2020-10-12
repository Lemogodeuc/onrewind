const { flushDb, formatPayload } = require("./helpers");
const { getTagPayload, createTag } = require("./services/tag");
const { getVideoPayload, createVideoWithNoTag, createVideoWithTag } = require("./services/video");

module.exports = {
  formatPayload,
  flushDb,
  getTagPayload,
  createTag,
  getVideoPayload,
  createVideoWithNoTag,
  createVideoWithTag
};

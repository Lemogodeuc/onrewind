const faker = require("faker");
const { Video } = require("../../../app/models");
const { formatPayload } = require("../helpers");
const { getTagPayload } = require("./tag");

/**
 * @typedef Video
 * @type {Object}
 * @property {String} [name] - Name of the video
 * @property {String} [description] - Description of the video
 * @property {String} [url] -  Url of the video
 * @property {Date} [createdAt] - Date the video has been created
 * @property {Date} [updatedAt] - Date the video has been updated
 */

/**
 * @typedef Tag
 * @type {Object}
 * @property {String} [value] - Value of the tag
 */

/**
 * Generates a video payload
 * @param {Video} props
 * @return {Object} An object with the video payload
 */
const getVideoPayload = async (props = {}) => {
  const VIDEO_MODEL = {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    url: faker.system.filePath(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };

  const validProps = formatPayload(VIDEO_MODEL, props);
  return Object.assign({}, VIDEO_MODEL, validProps);
};

/**
 * Insert a video without tag in database
 * @param  {Object} [videoProps] Video properties
 * @return {Object} Created video instance
 */
const createVideoWithNoTag = async (videoProps = {}) => {
  try {
    const payload = await getVideoPayload(videoProps);
    return await Video.create(payload);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Insert a video with a tag in database
 * @param {Video} videoProps
 * @param {Tag} tagProps
 * @return {Object} Created video instance
 */
const createVideoWithTag = async (videoProps = {}, tagProps = {}) => {
  try {
    const tag = await getTagPayload(tagProps);
    const video = await getVideoPayload(videoProps);
    video.tags = [{ value: tag.value }];
    const includes = { include: [{ association: "tags" }] };
    return await Video.create(video, includes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getVideoPayload,
  createVideoWithNoTag,
  createVideoWithTag
};

const faker = require("faker");
const { Tag } = require("../../../app/models");
const { formatPayload } = require("../helpers");

/**
 * @typedef Tag
 * @type {Object}
 * @property {String} [value] - Value of the tag
 */

/**
 * Generates a tag payload
 * @param {Object} [props] Tag object property
 * @param {String} [props.value] Tag property value
 * @return {Object} An object with the tag payload
 */
const getTagPayload = async (props = {}) => {
  const TAG_MODEL = {
    value: faker.lorem.word()
  };

  const validProps = formatPayload(TAG_MODEL, props);
  return Object.assign({}, TAG_MODEL, validProps);
};

/**
 * Insert a tag in database
 * @param {Object} [props] Tag object property
 * @param {String} [props.value] Tag property value
 * @return {Object} Created tag instance
 */
const createTag = async (props = {}) => {
  try {
    const payload = await getTagPayload(props);
    return await Tag.create(payload);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTagPayload,
  createTag
};

const sequelize = require("../../../app/database");

/**
 * Flush testing database
 * @description Database name need to end with _test
 * @example onrewind_test
 * @return {Void}
 */
const flushDb = async () => await sequelize.sync({ force: true, match: /_test$/ });

/**
 * Check if given object is empty or not
 * @param {Object} object - Object to test
 * @return {Boolean}
 */
const isEmptyObject = object => {
  if (Object.keys(object).length === 0 && object.constructor === Object) {
    return true;
  }
  return false;
};

/**
 * Format model payloads with expected properties
 * @param {Object} modelProps - Default model properties
 * @param {Object} props - Given props
 * @return {Object} Formated object with expected properties
 */
const formatPayload = (modelProps, props) => {
  const isEmpty = isEmptyObject(props);
  if (isEmpty) return modelProps;

  const mandatory = Object.keys(modelProps);

  for (const prop in props) {
    if (!mandatory.includes(prop)) {
      delete props[prop];
    }
  }

  return props;
};

module.exports = {
  formatPayload,
  flushDb
};

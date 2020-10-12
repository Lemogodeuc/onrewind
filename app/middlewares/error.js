const ERROR_TYPES = [
  {
    types: ["is_null", "not_unique"],
    code: 400
  },
  {
    types: ["unauthorized"],
    code: 403
  }
];

/**
 * Determinate status code of an error
 * @param {String} validatorKey
 * @return {Number} Error status code
 */
function getCode(validatorKey) {
  for (const errorType of ERROR_TYPES) {
    if (errorType.types.includes(validatorKey)) {
      return errorType.code;
    }
  }
  return 500;
}

module.exports = async (err, _, res, __) => {
  let error = {};

  try {
    if (err.errors && err.errors[0].constructor.name === "ValidationErrorItem") {
      const { message, type, validatorKey, instance } = err.errors[0];
      error.code = await getCode(validatorKey);
      error.type = type;
      error.details = message;
      error.key = validatorKey;
      error.dataValues = instance.dataValues;
    } else if (err.code) {
      return res.status(err.code).json(err);
    } else {
      console.log("ERROR", err);
    }
    res.status(error.code || 500).json(error);
  } catch (error) {
    console.log(error);
  }
};

module.exports = (_, res) => {
  const error = {
    code: 404,
    type: "Not found",
    details: "Unable to retrieve requested ressource at this endpoint"
  };
  res.status(404).json(error);
};

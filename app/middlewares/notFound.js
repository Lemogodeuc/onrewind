module.exports = (_, res) => {
  res.errorMsg = "No ressource found at this endpoint";
  res.status(404).json({ errors: [{ msg: res.errorMsg }] });
};

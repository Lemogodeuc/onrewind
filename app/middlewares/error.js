module.exports = (err, _, res, __) => {
  res.errorMsg = err;
  res.status(500).json({ errors: [{ err }] });

  console.log({ err });
};

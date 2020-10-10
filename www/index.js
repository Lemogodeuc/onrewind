const app = require("../index");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}/`);
});

const { Sequelize } = require("sequelize");

const { DATABASE_PASSWORD, DATABASE_USER, DATABASE_HOST } = process.env;

const DATABASE_DB = process.env.NODE_ENV === "test" ? "onrewind_test" : process.env.DATABASE_DB;
// console.log("DATABASE_DB", DATABASE_DB);
// console.log("DATABASE_USER", DATABASE_USER);
// console.log("DATABASE_PASSWORD", DATABASE_PASSWORD);
const sequelize = new Sequelize(DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "postgres",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // sync: true,
  logging: false
});

// (async () => {
//   try {
//     if (process.env.NODE_ENV === "test") {
//       console.log("Hitting _test DB");
//       await sequelize.sync({ force: true, match: /_test$/ });
//     } else {
//       await sequelize.sync();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();

module.exports = sequelize;

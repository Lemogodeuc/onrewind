const { Sequelize } = require("sequelize");

const { DATABASE_PASSWORD, DATABASE_USER } = process.env;

const DATABASE_DB = process.env.NODE_ENV === "test" ? "onrewind_test" : process.env.DATABASE_DB;

const sequelize = new Sequelize(DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "postgres",
  host: DATABASE_HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  sync: true
});

(async () => {
  try {
    if (process.env === "test") {
      await sequelize.sync({ force: true, match: /_test$/ });
    } else {
      await sequelize.sync();
    }
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;

const { Sequelize } = require("sequelize");

const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;
const username = process.env.DATABASE_USERNAME;

const sequelize = new Sequelize(database, username, password, {
  dialect: "postgres",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

module.exports = sequelize;

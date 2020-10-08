const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Tag extends Model {}

Tag.init(
  {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  { sequelize, modelName: "tag", tableName: "tags", underscored: true, timestamps: false }
);

module.exports = Tag;

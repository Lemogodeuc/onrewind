const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Video extends Model {}

Video.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  { sequelize, modelName: "video", tableName: "videos", underscored: true }
);

module.exports = Video;

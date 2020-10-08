const Video = require("./video");
const Tag = require("./tag");

Video.belongsToMany(Tag, {
  as: "tags",
  through: "_m2m_videos_tags",
  foreignKey: "video_id",
  otherKey: "tag_id",
  timestamps: false
});

Tag.belongsToMany(Video, {
  as: "videos",
  through: "_m2m_videos_tags",
  foreignKey: "tag_id",
  otherKey: "video_id",
  timestamps: false
});

module.exports = { Video, Tag };

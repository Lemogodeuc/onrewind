const { Video, Tag } = require("../models");

module.exports = {
  createOne: async (req, res, next) => {
    const { value } = req.body;
    try {
      // Create new tag and return it with his ID
      const newTag = await Tag.create({ value });
      res.status(201).json(newTag);
    } catch (error) {
      next(error);
    }
  },
  deleteOne: async (req, res, next) => {
    const { id } = req.params;

    try {
      // Try to fetch tag
      const tagToDelete = await Tag.findByPk(id);
      // If doesn't exists return response 204 too
      if (!tagToDelete) {
        return res.status(204).json();
      }
      // If exists destroy and return response 204 too
      tagToDelete.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getVideosByTagId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const videos = await Video.findAll({
        include: {
          model: Tag,
          as: "tags",
          where: {
            id
          }
        }
      });
      // If no video is found send back empty array
      res.json(videos);
    } catch (error) {
      next(error);
    }
  }
};

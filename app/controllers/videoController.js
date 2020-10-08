const { Video, Tag } = require("../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      // Retrieve one specific video with associated tags
      const video = await Video.findByPk(id, {
        include: ["tags"]
      });
      res.json(video);
    } catch (error) {
      next(error);
    }
  },
  getAll: async (_, res, next) => {
    try {
      // Retrieve all videos with their tags
      const videos = await Video.findAll({
        include: ["tags"]
      });
      res.json(videos);
    } catch (error) {
      next(error);
    }
  },
  createOne: async (req, res, next) => {
    const url = uuidv4();
    const { name, description } = req.body;

    if (!name) {
      return res.status(409).json({ error: "Field 'name' is missing" });
    }

    try {
      // Create new video ressource with generated url
      const newVideo = await Video.create({ name, description, url });
      res.status(201).json(newVideo);
    } catch (error) {
      next(error);
    }
  },
  updateOne: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      // Check if dates are updated
      if (body.createdAt) {
        body.createdAt = new Date(body.createdAt);
      }
      if (body.updatedAt) {
        body.updatedAt = new Date(body.updatedAt);
      }

      // Get the video to update
      const videoToUpdate = await Video.findByPk(id);

      // Send 404 if not found
      if (!videoToUpdate) {
        res.status(404).json({ err: "Video not found" });
      }

      // Update, save and return
      Object.assign(videoToUpdate, body);
      await videoToUpdate.save();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      // Try to get and detroy ressource. If doesn't exists send back status 204 too
      const videoToDelete = await Video.findByPk(id);
      videoToDelete.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  addTag: async (req, res, next) => {
    const { videoId, tagId } = req.params;
    try {
      // Try to fetch required video
      const video = await Video.findByPk(videoId, {
        include: ["tags"]
      });

      // If not found send 404
      if (!video) {
        return res.status(404).json(`Video with id '${videoId}' not found`);
      }

      // Try to fetch required tag
      const tag = await Tag.findByPk(tagId);

      // If not found send 404
      if (!video || !tag) {
        return res.status(404).json(`Tag with id '${tagId}' not found`);
      }

      // Save and send response
      await video.addTag(tag);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  removeTag: async (req, res, next) => {
    const { videoId, tagId } = req.params;
    try {
      // Try to fetch required video
      const video = await Video.findByPk(videoId, {
        include: ["tags"]
      });

      // If not found send 404
      if (!video) {
        return res.status(404).json(`Video with id '${videoId}' not found`);
      }

      // Try to fetch required tag
      const tag = await Tag.findByPk(tagId);

      // If not found send 404
      if (!video || !tag) {
        return res.status(404).json(`Tag with id '${tagId}' not found`);
      }
      // Save and send response
      await video.removeTag(tag);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};

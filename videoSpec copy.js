require("dotenv").config();
process.env.NODE_ENV = "test";

const { Video, Tag } = require("./app/models");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./index");
const should = chai.should();

chai.use(chaiHttp);

describe("Testing Videos", () => {
  /*
   * Testing GET /videos
   */
  describe("/GET videos", () => {
    it("should get all videos", done => {
      chai
        .request(server)
        .get("/videos")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should get one videos", done => {
      chai
        .request(server)
        .get("/videos/8")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Testing POST /videos
   */
  describe("/POST video", () => {
    it("it should not POST a video without name field", done => {
      const video = {
        description: "Test de description"
      };
      chai
        .request(server)
        .post("/videos")
        .send(video)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
    it("it should create a new video", done => {
      const video = {
        name: "On rewind tout",
        description: "Test de description"
      };
      chai
        .request(server)
        .post("/videos")
        .send(video)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          done();
        });
    });
  });
  describe("/POST video", async () => {
    let video;

    beforeEach(done => {
      Video.findAll({ raw: true, order: [["id", "DESC"]], limit: 1 }).then(result => {
        video = result;
        done();
      });
    });
    it("it should update a new video", done => {
      const { id } = video[0];
      const update = {
        name: "name",
        description: "description"
      };
      chai
        .request(server)
        .post(`/videos/${id}`)
        .send(update)
        .end((err, res) => {
          res.should.have.status(204);
          res.noContent;
          done();
        });
    });
  });

  /*
   * Testing POST tag to /videos
   */
  describe("/POST video/:videoId/tag/:tagId", () => {
    let video;
    let tag;
    before(async () => {
      const fetchedVideo = await Video.findAll({ order: [["id", "ASC"]], limit: 1 });
      if (fetchedVideo[0] && fetchedVideo[0].id === 1) {
        fetchedVideo[0].destroy();
      }
      tag = await Tag.findAll({ raw: true, order: [["id", "DESC"]], limit: 1 });
    });
    it("it should NOT add a new tag to a not found video", done => {
      chai
        .request(server)
        .post(`/videos/1/tags/${tag.id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("/POST video/:videoId/tag/:tagId", async () => {
    let video;
    let tag;
    beforeEach(async () => {
      video = await Video.findAll({ raw: true, order: [["id", "DESC"]], limit: 1 });
      tag = await Tag.findAll({ raw: true, order: [["id", "DESC"]], limit: 1 });
    });
    it("it should add a tag to a video", done => {
      chai
        .request(server)
        .post(`/videos/${video[0].id}/tags/${tag[0].id}`)
        .end((err, res) => {
          res.should.have.status(204);
          res.noContent;
          done();
        });
    });
    it("it should remove tag from a video", done => {
      // console.log("video ******", video);
      chai
        .request(server)
        .delete(`/videos/${video[0].id}/tags/${tag[0].id}`)
        .end((err, res) => {
          res.should.have.status(204);
          res.noContent;
          done();
        });
    });
  });
});

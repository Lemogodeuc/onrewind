const { createVideoWithTag, createVideoWithNoTag, getVideoPayload, flushDb } = require("./utils");

const chai = require("chai");
const { expect } = chai;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");
chai.use(chaiHttp);

describe("Testing Videos routes", () => {
  before(async () => {
    await createVideoWithNoTag();
    await createVideoWithTag({ name: "Revivez le Super Bowl" }, { value: "Football US" });
  });

  /**
   * GET /videos
   */
  describe("1 - GET /videos", () => {
    it("GET /videos - should get a list of videos", async () => {
      const res = await chai.request(server).get("/videos/");
      expect(res.status, "Unexpected status code").to.equal(200);
      expect(res.body, "Should be an array").to.be.an("array");
      expect(res.body, "Array shouldn't be empty").to.be.an("array").that.is.not.empty;
    });

    it("GET /videos/:id - should get 404 Not Found", async () => {
      const res = await chai.request(server).get("/videos/999");
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("code");
      res.body.should.have.property("type");
      res.body.should.have.property("details");
    });

    it("GET /videos/:id - should get one video with no tags", async () => {
      const res = await chai.request(server).get("/videos/1");
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("id");
      res.body.should.have.property("name");
      res.body.should.have.property("description");
      res.body.should.have.property("tags");
      res.body.tags.should.be.a("array").to.be.empty;
      res.body.should.have.property("createdAt");
      res.body.should.have.property("updatedAt");
    });

    it("GET /videos/:id - should get one video with at least one tag", async () => {
      const res = await chai.request(server).get("/videos/2");
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("id");
      res.body.should.have.property("name");
      res.body.should.have.property("description");
      res.body.should.have.property("tags");
      res.body.tags.should.be.a("array").to.be.not.empty;
      res.body.tags.should.be.a("array");
      res.body.tags.forEach(object => {
        object.should.have.property("id").that.is.a("number");
        object.should.have.property("value").that.is.a("string");
        object.should.have.property("_m2m_videos_tags").that.is.a("object");
      });
      res.body.should.have.property("createdAt");
      res.body.should.have.property("updatedAt");
    });
  });

  /**
   * POST /videos
   */
  describe("2 - POST /videos", async () => {
    it("POST /videos/ - should create a video", async () => {
      const res = await chai
        .request(server)
        .post("/videos/")
        .send(await getVideoPayload());
      // console.log(res.body);
      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("id");
      res.body.should.have.property("name");
      res.body.should.have.property("description");
      res.body.should.have.property("createdAt");
      res.body.should.have.property("updatedAt");
    });
    it("POST /videos/ - should not create a video without a name", async () => {
      const payload = await getVideoPayload();
      delete payload.name;
      const res = await chai.request(server).post("/videos/").send(payload);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("code");
      res.body.should.have.property("type");
      res.body.should.have.property("details");
    });
  });

  /**
   * PUT /videos
   */
  describe("3 - PUT /videos", () => {
    it("PUT /videos/:id - should update a video", async () => {
      const payload = await getVideoPayload();
      const res = await chai.request(server).put("/videos/1").send(payload);
      res.should.have.status(204);
    });
    it("PUT /videos/:id - should not update a video with not valid id", async () => {
      const payload = await getVideoPayload();
      const res = await chai.request(server).put("/videos/999").send(payload);
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("code");
      res.body.should.have.property("type");
      res.body.should.have.property("details");
    });
    it("PUT /videos/:id - should not update a video with an existing url", async () => {
      const { body } = await chai.request(server).get("/videos/2");
      delete body.tags;
      const res = await chai.request(server).put("/videos/1").send(body);
      res.should.have.status(400);
    });
  });

  /**
   * DELETE /videos
   */
  describe("4 - DELETE /videos", () => {
    it("DELETE /videos/:id - should delete video", async () => {
      const res = await chai.request(server).delete("/videos/1");
      res.should.have.status(204);
    });

    it("GET /videos/:id - should not get deleted video", async () => {
      const res = await chai.request(server).get("/videos/1");
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("code");
      res.body.should.have.property("type");
      res.body.should.have.property("details");
    });

    it("DELETE /videos/:id - should not send an error if video doesn't exist", async () => {
      const res = await chai.request(server).delete("/videos/999");
      res.should.have.status(204);
    });
  });

  after(() => {
    flushDb();
  });
});

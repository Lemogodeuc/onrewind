const chai = require("chai");
const { expect } = chai;
const waitPort = require("wait-port");
const server = require("../www/index");

describe("Testing server", () => {
  const PORT = parseInt(process.env.PORT, 10);
  const params = {
    port: PORT,
    interval: 2000
  };

  let isOpen;

  before(async () => {
    isOpen = await waitPort(params, 5000);
  });

  it("Server should be listening", async () => {
    expect(isOpen).to.be.true;
  });

  it("GET /unknown/route - should get 404 Not Found", async () => {
    const res = await chai.request(server).get("/unknown/");
    res.should.have.status(404);
    res.body.should.be.a("object");
    res.body.should.have.property("code");
    res.body.should.have.property("type");
    res.body.should.have.property("details");
  });
});

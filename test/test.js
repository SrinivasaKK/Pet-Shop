const chai = require("chai");

const chaiHttp = require("chai-http");

const app = require("./../index");

// Configure chai

chai.use(chaiHttp);

chai.should();

describe("/GET owners", () => {
  it("it should GET all the owners", done => {
    chai

      .request(app)

      .get("/owner")

      .end((err, res) => {
        res.should.have.status(200);

        res.body.should.be.a("array");

        done();
      });
  });
});

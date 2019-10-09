const { chai, chaiHttp, app } = require("./common");

chai.should();
// Configure chai

chai.use(chaiHttp);

// test get route to get owners
describe("/GET owners", () => {
  it("it should GET all the owners", done => {
    chai
      .request(app)
      .get("/owner")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

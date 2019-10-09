const { chai, chaiHttp, app } = require("./common");

chai.should();
// Configure chai

chai.use(chaiHttp);
/* Get pets belonging to particular owner */
describe("/GET/:id owner", () => {
  it("it should GET a pet by the given owner id", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red",
      ownedBy: "0"
    };

    chai
      .request(app)
      .get(`/owner/${pet.ownedBy}`)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

/* Negative test case where owner is not present or owner does not own any pet  */
describe("/GET/:id owner", () => {
  it("it should not GET a pet by the given owner id", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red",
      ownedBy: "8"
    };

    chai
      .request(app)
      .get(`/owner/${pet.ownedBy}`)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

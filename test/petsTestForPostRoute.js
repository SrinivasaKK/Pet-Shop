const { chai, chaiHttp, app } = require("./common");
chai.should();
// Configure chai

chai.use(chaiHttp);

describe("/POST pets", () => {
  it("it should not POST a pet without name field", done => {
    const pet = {
      color: "red",
      breed: "lab",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST pets", () => {
  it("it should not POST a pet without color field", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST pets", () => {
  it("it should not POST a pet without age field", done => {
    const pet = {
      name: "test1",
      color: "red",
      breed: "lab",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
/* Restricted age of pets between 1 and 50 */
describe("/POST pets", () => {
  it("it should not POST a pet with age field value less than 0", done => {
    const pet = {
      name: "test1",
      color: "red",
      breed: "lab",
      type: "dog",
      pet: "0",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST pets", () => {
  it("it should not POST a pet with age field value greater than 50 ", done => {
    const pet = {
      name: "test1",
      color: "red",
      breed: "lab",
      type: "dog",
      pet: "51",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/POST pets", () => {
  it("it should not POST a pet without breed field", done => {
    const pet = {
      name: "test1",
      color: "red",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/POST pets", () => {
  it("it should not POST a pet without type field", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      color: "red",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

/* type of pet must be cat or dog */
describe("/POST pets", () => {
  it("it should not POST a pet if type is neither cat nor dog field", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      color: "red",
      age: "12",
      type: "do",
      ownedBy: "1"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/POST pets", () => {
  it("it should not POST a pet without ownedBy field", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red"
    };
    chai
      .request(app)
      .post("/pets")
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

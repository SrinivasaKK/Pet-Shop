const chai = require("chai");
const _helpers = require("../lib/helpers");
const chaiHttp = require("chai-http");
const app = require("../index");

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

describe("Pets", () => {
  beforeEach(done => {
    //Before each test remove the pets.json file
    _helpers
      .removeFile("pets.json")
      .then(resp => {
        done();
      })
      .catch(done);
  });

  // test the GET route of pets when the file is not present
  describe("/GET pets", () => {
    it("it should not GET all the pets", done => {
      chai
        .request(app)
        .get("/pets")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});

//POST route of pets
describe("/POST pets", () => {
  it("it should POST a pet", done => {
    const pet = {
      name: "testPet",
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
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//get all pets
describe("/GET pets", () => {
  it("it should GET all the pets", done => {
    chai
      .request(app)
      .get("/pets")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

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

describe("/GET/:id owner", () => {
  it("it should GET a pet by the given owner id", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red",
      ownedBy: "1"
    };

    chai
      .request(app)
      .get("/owner/" + pet.ownedBy)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

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
      .get("/owner/" + pet.ownedBy)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

//PUT route of pets
describe("/PUT/:id pet", () => {
  it("it should not UPDATE a pet given the id", done => {
    const pet = {
      id: "1",
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red",
      ownedBy: "8"
    };

    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send({
        pet
      })
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

describe("/PUT/:id pets", () => {
  it("it should not update a pet without name field", done => {
    const pet = {
      id: "1",
      color: "red",
      breed: "lab",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/PUT/:id pets", () => {
  it("it should not update a pet without color field", done => {
    const pet = {
      id: "1",
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/PUT/:id pets", () => {
  it("it should not update a pet without age field", done => {
    const pet = {
      name: "test1",
      color: "red",
      breed: "lab",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/PUT/:id pets", () => {
  it("it should not update a pet without breed field", done => {
    const pet = {
      id: "1",
      name: "test1",
      color: "red",
      age: "12",
      type: "dog",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/PUT/:id pets", () => {
  it("it should not update a pet without type field", done => {
    const pet = {
      id: "1",
      name: "test1",
      breed: "lab",
      age: "12",
      color: "red",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/PUT/:id pets", () => {
  it("it should not update a pet if type is neither cat nor dog field", done => {
    const pet = {
      id: "1",
      name: "test1",
      breed: "lab",
      color: "red",
      age: "12",
      type: "do",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/PUT/:id pets", () => {
  it("it should not update a pet without ownedBy field", done => {
    const pet = {
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red"
    };
    chai
      .request(app)
      .put("/pets/" + pet.id)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

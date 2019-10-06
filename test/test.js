const chai = require("chai");
const _helpers = require("../lib/helpers");
const chaiHttp = require("chai-http");
const app = require("../index");
const fs = require("fs");
const path = require("path");
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

/* negative test case - trying to get all pets when the file is not present*/
describe("Pets", () => {
  beforeEach(done => {
    //Before each test remove the pets.json file
    if (fs.existsSync(path.join(__dirname + "/../data/pets.json"))) {
      _helpers
        .removeFile("pets.json")
        .then(resp => {
          done();
        })
        .catch(done);
    } else {
      done();
    }
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

/* POST the data to test positive test case of get /pets */
//POST route of pets

describe("/POST pets", () => {
  it("it should POST a pet", done => {
    const pet = {
      name: "updatingPet",
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
// adding two sets of pets. This is to ensure PUT is working fine.
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

/* negative test cases of Post route
 testing y removing each required field
*/
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

/* Get pets belonging to particular owner */
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      .put(`/pets/${pet.id}`)
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
      id: "1",
      name: "test1",
      breed: "lab",
      age: "12",
      type: "dog",
      color: "red"
    };
    chai
      .request(app)
      .put(`/pets/${pet.id}`)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/PUT/:id pets", () => {
  it("it should not update a pet with age field value less than or equal to 0", done => {
    const pet = {
      id: "1",
      name: "test1",
      breed: "lab",
      age: "0",
      type: "dog",
      color: "red"
    };
    chai
      .request(app)
      .put(`/pets/${pet.id}`)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/PUT/:id pets", () => {
  it("it should not update a pet with age field value greater than 50 ", done => {
    const pet = {
      id: "1",
      name: "test1",
      color: "red",
      breed: "lab",
      type: "dog",
      age: "51",
      ownedBy: "1"
    };
    chai
      .request(app)
      .put(`/pets/${pet.id}`)
      .send(pet)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

/* success case of updating */
describe("/PUT/:id pets", () => {
  it("it should  update a pet ", done => {
    let id = "";
    _helpers
      .read("pets.json")
      .then(response => {
        const pets = _helpers.stringToJson(response);
        id = pets.pets[0].id;
        const pet = {
          id: id,
          name: "updatedName",
          color: "updatedColor",
          breed: "updatedBreed",
          type: "dog",
          age: "10",
          ownedBy: "1"
        };
        chai
          .request(app)
          .put(`/pets/${pet.id}`)
          .send(pet)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      })
      .catch(err => {});
  });
});

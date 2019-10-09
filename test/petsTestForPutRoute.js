const { chai, chaiHttp, app, _helpers } = require("./common");

chai.should();
// Configure chai

chai.use(chaiHttp);

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

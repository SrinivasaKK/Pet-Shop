const { chai, chaiHttp, app, _helpers } = require("./common");

const fs = require("fs");
const path = require("path");
chai.should();
// Configure chai

chai.use(chaiHttp);
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

/* POST the data to test positive test case of get /pets 
  Test data has owner id as 0 to avoid confusion between test data and data from front end

*/
//POST route of pets

describe("/POST pets", () => {
  it("it should POST a pet", done => {
    const pet = {
      name: "updatingPet",
      color: "red",
      breed: "lab",
      age: "12",
      type: "dog",
      ownedBy: "0"
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
      ownedBy: "0"
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

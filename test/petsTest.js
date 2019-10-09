const chai = require("chai");
const _helpers = require("../lib/helpers");
const chaiHttp = require("chai-http");
const app = require("../index");
const fs = require("fs");
const path = require("path");
chai.should();
// Configure chai

chai.use(chaiHttp);
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

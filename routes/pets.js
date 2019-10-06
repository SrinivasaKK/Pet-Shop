const express = require("express");
const petsRouter = express.Router();
const _helper = require("./../lib/helpers");

var pet = {
  pets: []
};
let file = "pets.json";

/*
1. Check if the file is present
2. If file is present, then read from the file, parse string data to json and send the respose
3. If file is not present, send an error response back 
*/
petsRouter.get("/", (req, res) => {
  _helper
    .isFilePresent(file)
    .then(success => {
      _helper
        .read(file)
        .then(data => {
          let parsedData = _helper.stringToJson(data);
          res.status(200).send(parsedData.pets);
        })
        .catch(err => {
          res.status(500).send({ msg: "No pets available" });
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/*
1. Check if the file is present
2. If file is present, then read from the file, parse string data to json
   push the new data to existing data, convert whole data to string and then write whole data back to file
3. If file is not present, create a file, then write the data into the file after converting to string
4. If file is present but it is empty, write the data into the file after converting to string
*/

petsRouter.post("/", (req, res) => {
  let petData = req.body;
  //check if all fields are present
  if (
    petData.name &&
    petData.color &&
    petData.age &&
    (parseInt(petData.age) > 0 && parseInt(petData.age) <= 50) &&
    petData.breed &&
    petData.type &&
    (petData.type.toLowerCase() == "dog" ||
      petData.type.toLowerCase() == "cat") &&
    petData.ownedBy
  ) {
    // create unique ID to identify each pet
    let id = _helper.createRandomnID();
    let newPet = {
      id: id,
      name: petData.name,
      color: petData.color,
      breed: petData.breed,
      age: petData.age,
      type: petData.type,
      ownedBy: petData.ownedBy
    };
    _helper
      .isFilePresent(file)
      .then(success => {
        _helper
          .read(file)
          .then(response => {
            pet = _helper.stringToJson(response);
            pet.pets.push(newPet);
            writeDataToFile(res, file, _helper.jsonToString(pet));
          })
          .catch(err => {
            pet.pets.push(newPet);
            writeDataToFile(res, file, _helper.jsonToString(pet));
          });
      })
      .catch(err => {
        pet.pets.push(newPet);
        writeDataToFile(res, file, _helper.jsonToString(pet));
      });
  }
  // if any of the fields are missing
  else {
    res.status(422).send({ msg: "missing required fields" });
  }
});

/*
1. Check if the file is present
2. If file is present, then read from the file, parse string data to json
  update the file based on unique ID, convert whole data to string and then write whole data back to file
3. If file is not present, send an error response back 

*/
petsRouter.put("/:id", (req, res) => {
  let id = req.params.id;
  let petData = req.body;
  //check if all fields are present
  if (
    petData.name &&
    petData.color &&
    petData.age &&
    (parseInt(petData.age) > 0 && parseInt(petData.age) <= 50) &&
    petData.breed &&
    petData.type &&
    (petData.type.toLowerCase() == "dog" ||
      petData.type.toLowerCase() == "cat") &&
    petData.ownedBy
  ) {
    _helper
      .read(file)
      .then(response => {
        pet = _helper.stringToJson(response);
        const updated = pet.pets.map(updatingPet => {
          if (updatingPet.id === id) {
            updatingPet.name = petData.name;
            updatingPet.age = petData.age;
            updatingPet.color = petData.color;
            updatingPet.type = petData.type;
            updatingPet.breed = petData.breed;
            return true;
          } else {
            return false;
          }
        });
        // write the updated data to the file only if the pet with send id is present
        updated[0] == true
          ? writeDataToFile(res, file, _helper.jsonToString(pet)) // jshint ignore:line
          : res.status(422).send({ msg: "Pet with the ID is not present" }); // jshint ignore:line
      })
      .catch(err => {
        res.status(500).send({ msg: "unable to update" });
      });
  } // if any of the fields are missing
  else {
    res.status(422).send({ msg: "missing required fields" });
  }
});

function writeDataToFile(res, file, data) {
  _helper
    .write(file, data)
    .then(success => {
      res.status(200).send({ msg: "success" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ msg: "failed" });
    });
}
module.exports = petsRouter;

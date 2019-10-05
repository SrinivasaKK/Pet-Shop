const express = require("express");
const ownerRouter = express.Router();
const ownerData = require("./../data/owners.json");
const _helper = require("./../lib/helpers");

let petfile = "pets.json";
let ownerFile = "owners.json";
// read data from owners file
ownerRouter.get("/", (req, res) => {
  _helper
    .isFilePresent(ownerFile)
    .then(success => {
      _helper
        .read(ownerFile)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send({ msg: "No owner available" });
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/*
1. Check if the file is present
2. If file is present, then read from the file, parse string data to json and send the respose
3. If file is not present, send an error response back 
*/
ownerRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  _helper
    .isFilePresent(petfile)
    .then(success => {
      _helper
        .read(petfile)
        .then(response => {
          if (response) {
            let parsedData = _helper.stringToJson(response);
            let ownerPets = parsedData.pets.filter(ownerPet => {
              if (ownerPet.ownedBy === id) {
                return ownerPet;
              }
            });
            res.status(200).send(ownerPets);
          } else {
            res.status(202).send({ msg: "Don't own any pets" });
          }
        })
        .catch(err => {
          res.status(500).send({ msg: "Don't own any pets" });
        });
    })
    .catch(err => {
      res.status(500).send({ msg: "Don't own any pets" });
    });
});
module.exports = ownerRouter;

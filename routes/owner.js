const express = require("express");
const ownerRouter = express.Router();
const ownerData = require("./../data/owners.json");
const _helper = require("./../lib/helpers");

let file = "pets.json";

// read data from owners file
ownerRouter.get("/", (req, res) => {
  res.status(200).send(ownerData);
});

/*
1. Check if the file is present
2. If file is present, then read from the file, parse string data to json and send the respose
3. If file is not present, send an error response back 
*/
ownerRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  _helper
    .isFilePresent(file)
    .then(success => {
      _helper
        .read(file)
        .then(response => {
          let parsedData = _helper.stringToJson(response);
          let ownerPets = parsedData.pets.filter(ownerPet => {
            if (ownerPet.ownedBy === id) {
              return ownerPet;
            }
          });
          if (ownerPets.length > 0) {
            res.status(200).send(ownerPets);
          } else {
            res.status(202).send("{'msg':'Don't own any pets}");
          }
        })
        .catch(err => {
          res.status(500).send("{'msg':'Don't own any pets}");
        });
    })
    .catch(err => {
      res.status(500).send("{'msg':'Don't own any pets}");
    });
});
module.exports = ownerRouter;

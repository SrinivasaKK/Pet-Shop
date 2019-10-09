const express = require("express");
const ownerRouter = express.Router();
const _helper = require("./../lib/helpers");
const { ownersFile, petsFile } = require("./../config");

// read data from owners file
ownerRouter.get("/", (req, res) => {
  _helper
    .isFilePresent(ownersFile)
    .then(success => {
      _helper
        .read(ownersFile)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          console.log(err);
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
  const id = req.params.id;
  _helper
    .isFilePresent(petsFile)
    .then(success => {
      _helper
        .read(petsFile)
        .then(response => {
          if (response) {
            const parsedData = _helper.stringToJson(response);
            const ownerPets = parsedData.pets.filter(ownerPet => {
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

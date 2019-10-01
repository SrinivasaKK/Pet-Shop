const express = require('express');
const petsRouter = express.Router();
const _helper = require('./../lib/helpers')

var pet = {
  pets : []
}
let file = 'pets.json';

petsRouter.get('/', (req,res) => {
  _helper.isFilePresent(file).then( success => {
    _helper.read(file).then( data => {
      
      let parsedData = _helper.stringToJson(data);
      res.status(200).send(parsedData);
    }).catch( err => {
      res.status(500).send("{'msg':'No pets available'}")
    }
    
    )
}).catch( err => {
res.status(500).send("{'msg':'No pets available'}")
})
});

petsRouter.post('/', (req,res) => {
  let petData = req.body;
  if(petData.name && petData.color && petData.age && petData.breed && petData.type){
    let id = _helper.createRandomnID();
    let newPet = {
      id:id,
      name:petData.name,
      color:petData.color,
      breed:petData.breed,
      age:petData.age,
      type:petData.type,
      ownedBy:"1"
    }
    _helper.isFilePresent(file).then(success => {
          _helper.read(file).then( response => {
              pet = _helper.stringToJson(response);
              pet.pets.push(newPet);
              writeDataToFile(res,file, _helper.jsonToString(pet));

          }).catch( err => {
            pet.pets.push(newPet);
            writeDataToFile(res,file, _helper.jsonToString(pet));
          })
    }).catch( err => {
      pet.pets.push(newPet);
      writeDataToFile(res,file, _helper.jsonToString(pet));
    })
  }
  else {
    res.status(422).send("{'msg':'missing required paramaters'}")
  }
})
     


function writeDataToFile(res,file,data) {
  _helper.write(file,data).then( success => {
         res.status(200).send("{'msg':'success'}")
  }).catch( err => {
    console.log(err)
    res.status(500).send("{'msg':'failed'}")
  })

}
module.exports = petsRouter;
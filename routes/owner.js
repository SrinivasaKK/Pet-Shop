const express = require('express');
const ownerRouter = express.Router();
const ownerData = require('./../data/owners.json')
const _helper = require('./../lib/helpers')

let file = 'pets.json'
ownerRouter.get('/', (req,res)=> {
   
  res.status(200).send(ownerData);
     
});

ownerRouter.get('/:id',(req,res) => {
  let id = req.params.id;
  
  _helper.isFilePresent(file).then( success => {
    _helper.read(file).then( response => {
      let parsedData = _helper.stringToJson(response);
     let ownerPets =  parsedData.pets.filter(ownerPet => {
        if(ownerPet.ownedBy === id){
         return ownerPet;
        }
      })
      if(ownerPets.length > 0) {
        res.status(200).send(ownerPets);
      }
      else {
        res.status(202).send("{'msg':'Don't own any pets}")
      }
    }).catch(err => {
      res.status(500).send("{'msg':'Don't own any pets}")
    }) 
  }).catch( err => {
    res.status(500).send("{'msg':'Don't own any pets}")
  })
})
module.exports = ownerRouter;
const express = require('express');
const petsRouter = express.Router();
const _helper = require('./../lib/helpers')

let file = 'pets.json'
petsRouter.get('/', (req,res)=> {
  _helper.isFilePresent(file).then( success => {
    _helper.read(file).then( data => {
      let parsedData = _helper.stringTOJson(data);
      res.status(200).send(parsedData.pets);
    }).catch(
      res.status(500).send("{'msg':'Unable to read data'}")
    )
}).catch( err => {
res.status(500).send("{'msg':'Unable to read data'}")
})
     
});

module.exports = petsRouter;
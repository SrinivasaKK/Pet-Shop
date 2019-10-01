const express = require('express');
const ownerRouter = express.Router();
const ownerData = require('./../data/owners.json')
const _helper = require('./../lib/helpers')

let file = 'pets.json'
ownerRouter.get('/', (req,res)=> {
   
  res.status(200).send(ownerData);
     
});

module.exports = ownerRouter;
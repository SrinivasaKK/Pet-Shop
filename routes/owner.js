const express = require('express');
const ownerRouter = express.Router();
const _helper = require('./../lib/helpers')

ownerRouter.get('/', (req,res)=> {
     _helper.list((err,data) => {
       if(!err){
        res.send(data)
       }
       else{
         res.send(err)
       }
      
     })
     
});

module.exports = ownerRouter;
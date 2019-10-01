const fs = require('fs');
const path = require('path');
const lib = {};

//actual path to the file (base directory)
lib.baseDir = path.join(__dirname+'/../data/');

lib.list = function(callback){
 
  fs.readdir(lib.baseDir,(err,data) => {
    if(err) {
      callback(err);
    }
    else{
      if(data && data.length>0){
        let trimmedFileNames = [];
         data.forEach((fileName) =>{
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
      }

      else {
        callback({'msg':'no owners found'});
      }
      
    }
   
  });
  
  };

  module.exports = lib;
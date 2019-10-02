const fs = require("fs");
const path = require("path");
const lib = {};

//actual path to the file (base directory)
lib.baseDir = path.join(__dirname + "/../data/");

lib.createRandomnID = () => {
  return Math.random()
    .toString(26)
    .slice(2);
};
lib.isFilePresent = file => {
  return new Promise((resolve, reject) => {
    fs.access(lib.baseDir + file, err => {
      return err ? reject(err) : resolve(err);
    });
  });
};

lib.read = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(lib.baseDir + file, (err, response) => {
      return err ? reject(err) : resolve(response);
    });
  });
};
lib.write = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(lib.baseDir + file, data, (err, response) => {
      return err ? reject(err) : resolve(response);
    });
  });
};

lib.stringToJson = data => {
  return JSON.parse(data);
};

lib.jsonToString = data => {
  return JSON.stringify(data);
};
module.exports = lib;

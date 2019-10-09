const dotenv = require("dotenv");
dotenv.config();

//export values saved in .env file
module.exports = {
  port: process.env.PORT || "4000",
  petsFile: "pets.json",
  ownersFile: "owners.json"
};

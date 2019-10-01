
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

// destructuring operator (es6) to read port value from config file
const {port} = require('./config');
var path = require('path');
var rfs = require('rotating-file-stream');
var logDirectory = path.join(__dirname, '/log');
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
//create owner route
const ownerRoute = require('./routes/owner');
const petsRoute = require('./routes/pets')
// direct default route to owner route

// owner route
app.use('/owner', ownerRoute);
app.use('/pets', petsRoute);
app.use(morgan('dev'));
app.use(express.static(__dirname+'../dist/index.html'));


//create server and start listening to request
app.listen(port,() =>{
  console.log(`Server started and listening on port ${port}`);
});



const express = require('express');
const app = express();
const morgan = require('morgan');

// destructuring operator (es6) to read port value from config file
const {port} = require('./config');

//create owner route
const ownerRoute = require('./routes/owner');
// direct default route to owner route

// owner route
app.use('/owner', ownerRoute);
app.use(morgan('dev'));
app.use(express.static(__dirname+'/data'));


//create server and start listening to request
app.listen(port,() =>{
  console.log(`Server started and listening on port ${port}`);
});


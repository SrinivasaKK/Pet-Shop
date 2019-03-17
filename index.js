const express = require('express');

const app = express();
const morgan = require('morgan');
const port = 5000;
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.listen(port,() =>{
  console.log(`Server started and listening on port ${port}`);
});

app.get('/',(req,res)=>{   
  res.setHeader('Content-Type','text/html');
  res.status(200).send('<html><body><h1>Hello, World!</h1></body></html>');
})
const app = require('express')();

const port = 5000;


app.get('/',(req,res)=>{
   
  console.log(`request from ${req.url}`)
  res.setHeader('Content-Type','text/html');
  res.status(200).send('<html><body><h1>Hello, World!</h1></body></html>');
})

app.listen(port,() =>{
  console.log(`Server started and listening on port ${port}`);
})
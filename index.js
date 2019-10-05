const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// destructuring operator (es6) to read port value from config file
const { port } = require("./config");
const path = require("path");
const cors = require("cors");
const rfs = require("rotating-file-stream");
const logDirectory = path.join(__dirname, "/log");

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
const accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});

// setup the logger
morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :response-time ms :res[content-length] :body :req[content-length] :res[content-length] :referrer :user-agent",

    { stream: accessLogStream }
  )
);
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

//create owner route
const ownerRoute = require("./routes/owner");
const petsRoute = require("./routes/pets");
// owner route
app.use("/owner", ownerRoute);
app.use("/pets", petsRoute);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
const server = http.createServer(app);

//create server and start listening to request
server.listen(port, err => {
  if (err) {
    console.log(`Unable to start the server on port ${port}`);
  } else {
    console.log(`Server started and listening on port ${port}`);
  }
});

module.exports = app;

let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let {log} = require('./logger');
require('dotenv').config();

// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const DB_NAME = "resthub";
const DB_URL_FOR_DEV = 'mongodb://localhost/' + DB_NAME;
const DB_URL_FOR_PROD = "mongodb+srv://junbang:" + process.env.DATABASE_PASS + "@cluster0.qu07u.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority"
const DB_URL = (process.env.NODE_ENV == "development") ? DB_URL_FOR_DEV : DB_URL_FOR_PROD;
const DB_OPTIONS = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
mongoose.connect(DB_URL, DB_OPTIONS, (err) => {
  if (err) {
    log("Database", "Error connecting database.")
    return ;
  }
  log("Database", "Database connected successfully.");
});

// Routes
app.use('/api', apiRoutes)

app.get('/', (req, res) => res.send("Welcome to Jun Bang's server."));

var port = process.env.PORT || 8080;
var environment = process.env.Node_ENV;
app.listen(port, function () {
     log("Server", "Running RestHub on port " + port + ". [State: " + environment + "]");
});
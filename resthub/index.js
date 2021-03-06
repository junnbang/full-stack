let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let {log} = require('./logger');
require('dotenv').config();
const serverless = require('serverless-http');

// Import routes
let apiRoutes = require("./api-routes")

// CORS Policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  next();
});

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// use 'testhub' as database for testing
// use 'resthub' as database for development and production
const DB_NAME = (process.env.NODE_ENV == "test") ? "testhub" : "resthub";
const DB_URL_FOR_DEV = 'mongodb://localhost/' + DB_NAME;
const DB_URL_FOR_PROD = "mongodb+srv://junbang:" + process.env.DATABASE_PASS + "@cluster0.qu07u.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority"
// use hosted database on mongodb atlas for production
// use local database for development
const DB_URL = (process.env.NODE_ENV == "production") ? DB_URL_FOR_PROD : DB_URL_FOR_DEV;
const DB_OPTIONS = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 5000,
}
mongoose.connect(DB_URL, DB_OPTIONS, (err) => {
  if (err) {
    log("Database", "Error connecting database.")
    log("Server", "Shutting down.")
    process.exit(0);
    return ;
  }
  log("Database", "Database connected successfully. [Database hosted on: " + DB_URL + "]");
  app.emit('dbReady');
});

// Routes
app.use('/api', apiRoutes)

app.get('/', (req, res) => res.send("Welcome to Jun Bang's server."));

var port = process.env.PORT || 8080;
var environment = process.env.Node_ENV;
app.listen(port, function () {
  log("Server", "Running RestHub on port " + port + ". [State: " + environment + "]");
});

module.exports = {
  server: app,
  handler: serverless(app)
}
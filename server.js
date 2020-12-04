//JavaScript Object to act as the app API endpoint.
let projectData = {};

//Require and config dotenv. Config assigns the content of .env file to process.env.
require("dotenv").config();

//Define the port and API key variables, process.env has the keys and values as defined in the .env file.
const port = process.env.PORT
const apiKey = process.env.APIKEY

//Require express and set up an instance of app
const express = require('express')
const app = express()

//Middleware
//Sets the body-parse to parsing the URL-encoded data with the querystring library.
app.use(bodyParser.urlencoded({ extended: false }));
//Parse application/json
app.use(bodyParser.json());

//Cors for cross origin allowance 
const cors = require('cors');

//Enables all CORS requests
app.use(cors());

//Connect the server-side and client-side (browser) code.
app.use(express.static("website"));

//Setup express server
app.listen(port, () =>
  console.log(`weather-app listening on port ${port}`),
);
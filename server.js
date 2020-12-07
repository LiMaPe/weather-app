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
//Require and set the body-parse to parsing the URL-encoded data with the querystring library.
const bodyParser = require('body-parser')
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

//Add a GET route that returns projectData 
app.get('/', function (req, res) {
    //To access GET variable use req.query() and req.params() methods.
    // Respond projectData object when a GET request is made.
    res.send(projectData);
  })

//Add a POST route that adds incoming data to projectData
app.post('/', function (req, res) {
    //To access POST variable use req.body() methods.
    console.log(req.body);
    projectData.push(req.body);
  })
 
  console.log(projectData);

//Require and configure dotenv.
require("dotenv").config();

//Define the port and API key variables, process.env has the keys and values as defined in the .env file.
const port = process.env.PORT
const apiKey = process.env.APIKEY
console.log(port);
console.log(apiKey);
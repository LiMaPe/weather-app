# The Weather Journal project. 

## Table of Contents

- [Introduction](#Introduction)
- [Get started](#Get)
- [Dependencies](#Dependencies)
- [Development](#Development)

# Introduction

The Weather Journal Project required me to create an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application.
This project is made after finishing a series of lectures on the theme Web APIs and Asynchronous. 

# Get started

-	Clone this repo.
-	Install Node.js if not already installed.
o	Check if node is installed by:
<br /> $ node -v
o	Install by: $ npm install node
-	To install all required dependencies run:
  <br />  $ npm install 
-	To start the local server run: 
  <br /> $ npm start

# Dependencies

-	Express
-	Cors
-	Body-parser
-	Dotenv
-	Pretty-checkbox

# Development

**Step 1. Project Setup**

-	For this project I set up a goal to use the terminal to a greater extent than I have before. Therefor I will start to make the directories and files via terminal.
-	To start, I added a project directory called weather-app and a file named server.js
-	I then opened the project in VS code. 
-	Command line commands used: 
<br />     $ mkdir weather-app
<br />     $ mkdir weather-app
<br />     $ cd weather-app
<br />     $ touch index.js
<br />     $ code .

**Node.js**
-	I had the program already installed, it is otherwise installed via command:
<br /> $ npm install node

**Package Manager**
-	Both NPM and Yarn download packages from npm repository. Since npm is used in the course I will also use it in this project. 
-	To set up the project with npm: 
<br /> $ npm init
-	We now have a package.json file for the project.

**Restarting the script automatically**
-	The project is for now set up so that I have to use the command, $ npm start, everytime I want to try out a change in my source code. 
-	To make the development process smoother there is a tool called nodemon (https://www.npmjs.com/package/nodemon)
-	Nodemon will automatically restart the script when it detects a change made in a file. It is not necessary but very practical!  
-	Running $ npm start, will after the change from node to nodemon in the package.json file run nodemon continuously until you stop the scripts. 


**Environmental variables**
-	In this project I will make use of a private API key. This is a type of information that you generally do not wish to make public at github or store in your client side code.  
-	For this project we are instructed to set the api in the file app.js for simplicity. An alternative and safer approach would be to use a .env file and call the API from the server side. 
-	To practice using a .env file I made one anyway and will fetch the port from it in my server side code. 
-	I place the .env file in the root directory and then add the API key and port variables and values to it.
<br /> $ touch .env
-	This file must be added to the gitignore file in order to remain private.
<br /> $ touch .gitignore
Then: .env is added inside the gitignore file. 
-	To be able to make the content of the env file available one of solutions I came across multiple times is the dotenv package. https://www.npmjs.com/package/dotenv
<br /> $ npm install dotenv
-	Read more: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

**Express setup**
-	“Fast, unopinionated, minimalist web framework for Node.js “(https://expressjs.com/ )
-	The Express package allow you to use JavaScript to build servers, routes and handlers to interact with Web APIs.
-	Install by command:
<br /> $ npm install express
-	Read more: https://www.npmjs.com/package/express 
-	Next step is to require Express, set up an instance of app. When this is done, initiate an express server. An express server is created using the listen() method, which takes two arguments. A port to run the server on, which we already defined in the .env file and imported to the server file, and a callback function.
-	When the server is setup, I connected the server-side code to the client-side code. The client-side code (not yet written..) will be in a directory called website. I connect them using:  app.use(express.static(“website”));

**Middleware – Body-parser**
-	“Parse incoming request bodies in a middleware before your handlers, available under the req.body property.” 
-	“bodyParser.urlencoded([options])
Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding” Source: http://expressjs.com/en/resources/middleware/body-parser.html
-	Install by command:
<br /> $ npm install body-parser
-	We set the app to use: 
<br /> o	app.use(bodyParser.urlencoded({ extended: false })); 
<br /> This set the body-parse to parsing the URL-encoded data with the querystring library.
<br /> o	app.use(bodyParser.json());
<br /> Parse application/json

**Middleware - Cors**
-	“CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.” (https://www.npmjs.com/package/cors)
-	Install by command:
<br /> $ npm install cors
-	Require cors: const cors = require('cors');
-	An instance of the app is setup to use cors() by:  app.use(cors())

**Weather information**
-	For this project we are required to use OpenWeatherMap for the weather data. 

**Step 2. GET and POST**

In this app we are learning to work with APIs that fetch data from a server, the data is used to update sections on the webpage. In our case weather data. 
Read more on how APIs work here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction 
The Route definition is as follows:  app.METHOD(PATH, HANDLER)

Where: 
-	app is an instance of express.
-	METHOD is an HTTP request method, in lowercase.
-	PATH is a path on the server.
-	HANDLER is the function executed when the route is matched.

(source https://expressjs.com/en/starter/basic-routing.html)

**GET route** 
-	A GET requests fetch data from specified resource. A server receives a request then processes it and returns a response.
-	It is recommended to only use GET requests to retrieve data from the server.
-	We add a GET route that returns the projectData object in server.js  
-	Method: app.get(path, handler)

**POST route**
-	A POST requests submit data to a specified resource. This is a way that you can collect and store user data for later access. The POST request sends data to the project's endpoint, which is projectData in this case, we can then access the data stored here through a GET request.
-	We installed body-parser earlier, Express requires this middleware to extract incoming data of a POST request. 
-	We add a POST route that adds incoming data to projectData. In the handler function, we add the data received from request.body.
-	Method: app.post(path, handler)

**Step 3. Get your weather data!**

**Fetch() and async**
-	First we need to write an async function in our client side code that uses the method fetch() to make a GET request to the OpenWeatherMap API.
-	The fetch api will take the url as a parameter. 
-	As per requirement, we use the API for a search per zipcode. 
-	https://openweathermap.org/current#zip
-	To make the function async, we use the async keyword. An async function return a promise. Inside an async function we get access to the await keyword. Await is as it sounds, it will pause, or await, until the promise fulfills. It will the return the resulting value. 
-	The function weatherData is an async function that takes two arguments, the zipcode provided by the user and a countrycode. For simplicity I have set the countrycode to US. WeatherData returns data about the weather provided by openweathermap. 

**Eventlistener**
-	An eventlistener is added to the form, when the user submits the form a callbackfunction is run.  The callbackfunction is async and will start by collecting the data provided by the user (zipcode and mood).
-	It will then call the validate the user zipcode to make sure it is valid. 
-	If the zipcode is valid it will call weatherData which returns the weather data. 
-	It will then use this data and the user mood data to call the postWeatherData function.
-	postWeatherData is an async function to POST the weather data to our server. It takes two arguments, an url and an object. 
-	When the function to post the data to our server is finished the last step is to update the UI by the function updateUI. 

**Update UI**
-	The async function updateUI collects the data stored in our server (in the endpoint named projectData).
-	The site is then updated with the results by setting the inneHTML of an h3 element to a string with the new data. 

**Final Step**
- Adding a css file and some styling to the page to make it look nice!
















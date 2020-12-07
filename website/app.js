/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//prel api key
const apiKey = "2428d73cca2d00e54151570f36a1afcc";


// The function weaterData will return data about weather in the provided zipcode. 

// function weatherData(zipCode, countryCode) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`)  
//     // Convert data to json
//     .then(function(respons) { return respons.json() }) 
//     // Display the data in the console
//     .then(function(data) {
//       console.log(data);
//     })
//     .catch(function() {
//       console.log("error")
//     });
// }
  

async function weatherData(zipCode, countryCode) {
    let respons = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`);
    let data =  await respons.json();
    return data;
  }


weatherData(11003,"us")
.then(data => console.log(data))


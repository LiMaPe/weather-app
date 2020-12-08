/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let currDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//prel api key
const apiKey = "2428d73cca2d00e54151570f36a1afcc";


// The function weaterData will return data about weather in the provided zipcode. 
async function weatherData(zipCode, countryCode) {
    let respons = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`);
    let data =  await respons.json();
    return data;
};

//Add eventlistener on #get__weather button to call the function weatherData with user input. 
const form = document.getElementById("form__weather");

form.addEventListener("submit", getWeather);

function getWeather(e) {
    e.preventDefault();
    //Get zipcode provided by user
    const zipInput = e.target[0].value;
    console.log("zipinput:",zipInput);
    //Get mood provided by user
    getMood();
    console.log(userMood);
    //Check if zipcode is valid, if valid get weather data. 
    if(validateZip(zipInput)) {
        weatherData(zipInput, "us")
        .then(data => {
            //makes a POST request to add the API data, as well as data entered by the user.
            postWeatherData('/mypath', {date: currDate, temp: data.main.temp, usermood: userMood});
        })
        .then(
            updateUI()
        );
    } else {
        return alert("Please enter valid US zipcode! If you don´t have one check out the weather in Elmont by entering zipcode: 11003 ");
    }
}

// Async function to POST the weather data to our server. 
const postWeatherData = async (url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', //we are accessing the POST route we setup in server.js. 
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',  //we handle our data with JSON
      },
      body: JSON.stringify(data), //we are turning the JavaScript object passed in the data parameter into a string.     
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      } catch(error) {
      console.log("error", error);
      }
  }

//Update UI with the data
const updateUI = async () => {
    const req = await fetch('/mypath');
    try{
      const allData = await req.json();
      console.log(allData);
      document.getElementById("date").innerHTML = allData.date;
      document.getElementById("temp").innerHTML = allData.temp;
      document.getElementById("usermood").innerHTML = allData.usermood;
    }catch(error){
      console.log("error", error);
    }
}

//Helper function, validate US zipcode
function validateZip(zip) {
regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
if (regexp.test(zip)) {
        return true;
      } else {
        return false;
      }; 
};

//Get HTML collection of all radio button option
let radioOptions = document.getElementsByClassName('radio');
// turn it to an array
radioOptions = Array.from(radioOptions);
console.log(radioOptions);

//Return the mood of the user as provided in radio buttons
let userMood;
function getMood() {
    radioOptions.forEach(option => {
        if(option.checked) {
            userMood = option.value;
            return userMood;
        };
    });
}




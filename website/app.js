/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let currDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const outputArea = document.getElementById("outputarea");
console.log(output);

//API KEY
const apiKey = //ADD YOU API KEY HERE !!! <----- IMPORTANT


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
    const zipInput = e.target[4].value;
    //Get mood provided by user
    getMood();
    //Check if zipcode is valid, if valid get weather data. 
    if(validateZip(zipInput)) {
        weatherData(zipInput, "us")
        .then(data => {
            //makes a POST request to add the API data, as well as data entered by the user.
            postWeatherData('/mypath', {date: currDate, temp: data.main.temp, city: data.name, weather: data.weather[0].main, feels: data.main.feels_like, usermood: userMood});
        })
        .then( () => {
            updateUI()
        }    
        );
    } else {
        return alert("Please enter valid US zipcode! If you don´t have one check out the weather in Elmont by entering zipcode: 11003 ");
    }
}

// Async function to POST the weather data to our server. 
const postWeatherData = async (url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', //we are accessing the POST route we setup in server.js. 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',  //we handle our data with JSON
      },
      body: JSON.stringify(data), //we are turning the JavaScript object passed in the data parameter into a string.     
    });
      try {
        const newData = await response.json();
        console.log("data added to endpoint", newData);
        return newData;
      } catch(error) {
      console.log("error", error);
      }
  }



//Update UI with the data
const updateUI = async () => {
    const req = await fetch('/mypath');
    try{
      const allData = await req.json();
      console.log("available data at UI update", allData);
      document.getElementById("output").innerHTML = `Todays date is ${allData.date}. <br>In <b>${allData.city}</b> it´s ${allData.temp} °F outside, although  it feels like ${allData.feels} °F. The weather forecast says ${allData.weather} and you are feeling like a ${allData.usermood}.`;
      if (allData.usermood === "raindrop") {
        outputArea.classList.remove("sunbeam");
        outputArea.classList.remove("cloud");
        outputArea.classList.remove("thundercloud");
        outputArea.classList.add("rain");
        console.log("new color rain");
        return;
      } else if (allData.usermood === "sunbeam"){
        outputArea.classList.remove("rain");
        outputArea.classList.remove("cloud");
        outputArea.classList.remove("thundercloud");
        outputArea.classList.add("sunbeam");
        console.log("new color sun");
        return;
      } else if (allData.usermood === "cloud"){
        outputArea.classList.remove("rain");
        outputArea.classList.remove("sunbeam");
        outputArea.classList.remove("thundercloud");
        outputArea.classList.add("cloud");
        console.log("new color cloud");
        return;
      } else if (allData.usermood === "thundercloud"){
        outputArea.classList.remove("rain");
        outputArea.classList.remove("sunbeam");
        outputArea.classList.remove("cloud");
        outputArea.classList.add("thundercloud");
        console.log("new color thundercloud");
        return;
      }
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
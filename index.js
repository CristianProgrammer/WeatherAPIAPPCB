//WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "08bb86f4cdf411f2baf86011b07153c8";
const spinner = document.querySelector(".spinner"); //Select Spinner
const errorDisplay = document.querySelector(".error") //Select Error Display

weatherForm.addEventListener("submit", async event => 
{
    event.preventDefault();
    
    const city = cityInput.value;
    
    if(city){
        try{
            // Shows the spinner while fetching 
            spinner.style.display = "block";
            card.style.display = "none";
            errorDisplay.style.display = "none";

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            
            //Hide spinner after data is fetched
            spinner.style.display = "none";
       
        }
        catch(error)
        {
            console.error(error);
            displayError(error);
        }
    finally{
        //Hide the spinner
        spinner.style.display = "none";
    }    
    }
    else{
        displayError("Please enter a city");
        spinner.style.display = "none"; //hide spinner
    }
});

async function getWeatherData(city)
{
    try{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl); //fetch function
    if(!response.ok){
        throw new Error("Could not fetch weather data");

    }
    //2 SEC TIMER FOR SPINNER TO BE SHOWN
    await new Promise(resolve => setTimeout (resolve, 1000));
    return await response.json(); 
    }
    catch(error){
    
        throw new Error("Network Error: Please check your connection");
    } 
}

function displayWeatherInfo(data)
{
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";
       
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)} °F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherID)
{
    //weather codes
    //switch case with boolean
    switch(true)
    {
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️"; // Thunderstorms
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️"; // Drizzle
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️"; // Rain
        case (weatherID >= 600 && weatherID < 700):
            return "❄️"; // Snow
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️";// Fog
        case (weatherID == 800):
            return "🌞"; //Clear Sky
        case (weatherID >= 801 && weatherID < 810):
            return "⛅️"; //Cloudy
        default: 
            return "❓";      
    }

}

function displayError(message)
{   // Will hide card and spinner, shows error message
   card.style.display = "none"; // Hide the weather card
   spinner.style.display = "none"; // hide the spinner
   
   //Error container
   let errorDisplay = document.querySelector(".error")


   //checks if error display exist; if not, create error message element container
    if (!errorDisplay){
    errorDisplay = document.createElement("div");
    errorDisplay.classList.add("error");
   //Error message appear to the body of page
   document.body.appendChild(errorDisplay); //append the new error container
      }

      //Create a paragraph for the error message
      const errorMessage = document.createElement("p");
    errorMessage.textContent = message;

    //apppend the error message to the error container
      errorDisplay.textContent = "";
      errorDisplay.appendChild(errorMessage);
    //Make the error message visible
    errorDisplay.style.display = "block"; //checks if error message is displayed
   /* card.textContent = "";
    card.style.display = "flex";
*/
 }
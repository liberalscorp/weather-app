// get weather api
const apiKey = "1ce157979e6015854da0de6e243170c0";
//const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// get city name
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

// add event listener

searchButton.addEventListener("click", () => {
    const cityName = searchInput.value;
    document.querySelector(".weather").style.display = "none";
    getWeather(cityName);
});

async function getWeather(cityName){

    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    if (response.status == 404){
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
    else
    {
        document.querySelector(".error").style.display = "none";
        makeChanges(data);
        forecast(data);
    }
        
}

makeChanges = (data) => {
    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + " °C";
    
    document.querySelector(".windy").innerHTML = data.list[0].wind.speed + " KM/H";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";

    const weathericon = document.querySelector(".weather-icon");
    const weather   = data.list[0].weather[0].main.toLowerCase();

 
    switch(weather){
        case "clouds":
            weathericon.src = "images/clouds.png";
            break;
        case "clear":
            weathericon.src = "images/clear.png";
            break;
        case "rain":
            weathericon.src = "images/rain.png";
            break;
        case "snow":
            weathericon.src = "images/snow.png";
            break;
        case "drizzle":
            weathericon.src = "images/drizzle.png";
            break;
        case "mist":
            weathericon.src = "images/mist.png";
            break;
        default:
            weathericon.src = "images/error.jpeg";
}

    document.querySelector(".weather").style.display = "flex";
}


forecast = (data) => {
    forecastData = data.list.filter((_, index) => index % 8 === 0 && index != 0).map((forecast) => {
        return {
            date: forecast.dt_txt,
            temp: Math.round(forecast.main.temp) + "°C",
            weather: forecast.weather[0].main.toLowerCase()
        };
    })

    forecastData = forecastData.slice(0,3);
    console.log(forecastData);
    displayForecast(forecastData);

    
}

function displayForecast(forecastData){
        const forecastContainer = document.querySelectorAll(".forecast-day");

        forecastData.forEach((forecast, index) => {

            const forecastBlock = forecastContainer[index];
            const weatherIcon = forecastBlock.querySelector("img");
            const dayElement = forecastBlock.querySelector(".day");
            const tempElement = forecastBlock.querySelector(".temp");
            const weatherElement = forecastBlock.querySelector(".weather");

            weatherIcon.src = "images/" + forecast.weather + ".png";
            dayElement.textContent = formatDate(forecast.date.split(" ")[0]);
            tempElement.textContent = "Temp: " + forecast.temp;
            weatherElement.textContent = "Weather: " + forecast.weather;

        })

}
function formatDate(date) {
    const [year, month, day] = date.split("-");

    return [day, month, year].join("-");
}


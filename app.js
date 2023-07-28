// API RELATED
const apiKey = '6be48f9dce70b7584c97a5cabc09f622';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
// &appid=

// GLOBAL VARIABLES
const mainBody = document.querySelector('.main');
const searchNotFound = document.querySelector(".search-not-found")
const currentDate = document.querySelector(".current-date");
const searchBox = document.querySelector(".search-container input")
const searchBtn = document.querySelector(".search-container button")
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const weatherCondition = document.querySelector('.weather-condition');
const weatherImg = document.querySelector(".weather-img");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");

async function weather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if response is approve or reject
    if (response.status == 404) {
        mainBody.style.display = 'none';
        searchNotFound.style.display = 'block';
    } else {
        const data = await response.json();
        const condition = data.weather[0].main;

        // Change city
        cityName.innerHTML = data.name + ', ' + data.sys.country;
        // Change temperature
        temperature.innerHTML = Math.round(data.main.temp) + "°c";
        // Change weather condition
        weatherCondition.innerHTML = condition;
        
        switch(condition) {
            case 'Clear':
                weatherImg.src = 'images/clear.png'
                break;
            case 'Clouds':
                weatherImg.src = 'images/clouds.png'
                break;
            case 'Drizzle':
                weatherImg.src = 'images/drizzle.png'
                break;
            case 'Rain':
                weatherImg.src = 'images/rain.png'
                break;
            case 'Snow':
                weatherImg.src = 'images/snow.png'
                break;
            case 'Mist':
                weatherImg.src = 'images/mist.png'
                break;
        }

        windSpeed.innerHTML = `${data.wind.speed}km/h`;
        humidity.innerHTML = `${data.main.humidity}%`;
        pressure.innerHTML = `${data.main.pressure}hPa`;

        mainBody.style.display = 'block';
        searchNotFound.style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    weather(searchBox.value);
});

// Get the current date
const dateToday = new Date();
const day = dateToday.getDate();
const month = dateToday.getMonth();
const year = dateToday.getFullYear();

// Convert month to alphabet
function getMonthName(month) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month];
}

const formattedDate = day + ", " + getMonthName(month) + " " + year;

// Get the time format "hh:mm AM/PM"
function getTimeString(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const currentTimes = getTimeString(dateToday);
const finalFormattedDate = `${formattedDate} <br> ${currentTimes}`;

currentDate.innerHTML = finalFormattedDate;


// DARK MODE SWITCH
const switchMode = document.querySelector("#switchBtn");
const windImg = document.querySelector('.wind-card img');
const humidityImg = document.querySelector(".humidity-card img");
const pressureImg = document.querySelector(".pressure-card img");

switchMode.addEventListener("click", function () {

    if (windImg.src.includes('wind-dark.png')) {
        windImg.src = 'images/wind-light.png';
    } else {
        windImg.src = 'images/wind-dark.png'
    }

    if (humidityImg.src.includes('humidity-dark.png')) {
        humidityImg.src = 'images/humidity-light.png';
    } else {
        humidityImg.src = 'images/humidity-dark.png'
    }

    if (pressureImg.src.includes('pressure-dark.png')) {
        pressureImg.src = 'images/pressure-light.png';
    } else {
        pressureImg.src = 'images/pressure-dark.png'
    }
});
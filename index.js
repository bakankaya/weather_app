import convertToASCII from "./src/convertToASCII.js";
import { weatherAPI, locationAPI } from "./src/APIkeys.js";


/* Creating Date Format */

const date = new Date();
const optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
//    dayPeriod: 'short'
  };
const optionsTime = {
    timeStyle: 'short'
}

document.querySelector(".date span").textContent = date.toLocaleDateString('en-EN', optionsDate);


/* Getting The Default City from Geoapify */

const location_URL = `https://api.geoapify.com/v1/ipinfo?apiKey=${locationAPI}`

fetch(location_URL)
.then(resp => resp.json())
.then((userLocationData) => {
  getWeather(userLocationData.city.name)
});


/* Getting Weather Data from Openweather */

function getWeather(cityName) {

  const weather_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}&units=metric`;

  fetch(weather_URL)
    .then((resp)=> resp.json())
    .then((data) =>{
      if (data.cod === 200){
          document.querySelector(".image").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          document.querySelector(".cityName").textContent = `${convertToASCII(data.name)}`;
          document.querySelector(".description").textContent = data.weather[0].description;
          document.querySelector(".temp").textContent = `${Math.round(data.main.temp)} °C `;
          document.querySelector(".speed").textContent = `${data.wind.speed} m/s`;
          document.querySelector(".humidity").textContent = `${data.main["humidity"]} %`;
          document.querySelector(".feeling").textContent = `${Math.round(data.main.feels_like)} 'C`;
          document.querySelector(".sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString("tr-TR",optionsTime);
          document.querySelector(".sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString("tr-TR",optionsTime);
      } else {
          document.querySelector(".cityName").textContent = "City not Found";
          const clearing = document.querySelectorAll(".info");
          clearing.forEach((e) => {
            e.innerText= "--";
          });
      }
    })
};


/* Search Button */

const btn = document.getElementById('search');
btn.addEventListener('click', searchWeather)
  function searchWeather(){
    if(document.getElementById("input").value == ""){
        return;
    } else{
      getWeather(document.getElementById("input").value);
      document.getElementById("input").value = "";
    }
  };

const bar = document.getElementById("input");
bar.addEventListener('keyup',
  (e) =>{if(e.code ==='Enter'){
    searchWeather()}});


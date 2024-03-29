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

/* Default City */
const cityQuery = document.querySelector(".location input");
const city = cityQuery.value;
const APIKEY = "a127619b02228ad2ee53bda273b6dabb";
const BASE_URL = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

fetch(BASE_URL)
  .then((resp)=> resp.json())
  .then((data) =>{
    if (data.cod === 200){
        document.querySelector(".image").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.querySelector(".cityName").textContent = data.name;
        document.querySelector(".description").textContent = data.weather[0].description;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C `;
        document.querySelector(".speed").textContent = `${data.wind.speed} m/s`;
        document.querySelector(".humidity").textContent = `${data.main["humidity"]} %`;
        document.querySelector(".feeling").textContent = `${Math.round(data.main.feels_like)} °C`;
        document.querySelector(".sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString("tr-TR",optionsTime);
        document.querySelector(".sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString("tr-TR",optionsTime);
//cityQuery.value = " ";
    } else {
        document.querySelector(".cityName").textContent = "City not Found";
        const clearing = document.querySelectorAll(".info");
        clearing.forEach((e) => {
          e.innerText= "--";
        });
        cityQuery.value = " ";
    }
  })

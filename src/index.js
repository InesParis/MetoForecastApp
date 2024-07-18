function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeDayElement = document.querySelector("#time-day");
  let date = new Date(response.data.time * 1000);

  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );

  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeDayElement.innerHTML = formatDate(date);
  currentWeatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-app-temperature-icon"/>`;

  forecastCityWeek(response.data.city);
  displayForecastWeek(response.data.city);
}
function forecastWeek(response) {
  let maxTemperatureElement = document.querySelector("#max-temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");
  maxTemperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.maximum
  );
  minTemperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.minimum
  );
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "4f2360cc5d2fbf9f02a9o90ddad3f50t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Madrid");

function displayForecastWeek(city) {
  let apiKeyForecast = "4f2360cc5d2fbf9f02a9o90ddad3f50t";
  let apiUrlWeek = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}`;

  axios.get(apiUrlWeek).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
       <div class="weather-forecast-date">${formatDay(day.time)}</div>
       <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
       <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature-high"><strong>${Math.round(
          day.temperature.maximum
        )}</strong></div>
         <div class="weather-forecast-temperature-low">${Math.round(
           day.temperature.minimum
         )}</div>
       </div>
       </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function forecastCityWeek(city) {
  let apiKeyForecast = "4f2360cc5d2fbf9f02a9o90ddad3f50t";
  let apiUrlWeek = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}`;

  axios.get(apiUrlWeek).then(forecastWeek);
}

//everything updatedd
function formatDate(date) {
  let now = new Date();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let currentDate = `${day}, ${hours}:${minutes}`;

  return currentDate;
}

document.getElementById("date").innerHTML = formatDate();

let apiKey = `a606oe7b016d122f0t18d2431534646a`;

function submitCity(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function showForecast(response) {
  let forecast = response.data.daily;
  let currentForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-4.5">
        <div class="weather-forecast-date">
          <p>${formatDay(day.time)}</p>
        </div><br /><img src="${day.condition.icon_url}" />
        <br />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${day.temperature.maximum}°</span><span
              class="weather-forecast-temp-min">${day.temperature.minimum}°</span>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector(`#degrees`);
  currentTemperature.innerHTML = `${temperature}`;

  let cityElement= document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  console.log(response.data.city);

  celsiusTemperature = Math.round(response.data.temperature.current);

  let description = response.data.condition.description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${description}`;

  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;

  let speed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = `${speed}`;

  let icon = response.data.condition.icon;
  let currentWeatherIcon = document.querySelector("#icon");
  currentWeatherIcon.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  getForecast(response.data.coordinates);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = `a606oe7b016d122f0t18d2431534646a`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}


function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = celsiusTemperature;
}

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let searchForLocation = document.querySelector("#search-form");
searchForLocation.addEventListener("submit", submitCity);

search("New York");
//

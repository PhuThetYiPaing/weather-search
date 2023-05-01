//challenge 1
let now = new Date();

let h4 = document.querySelector("h4");

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
  "Saturday"
];
let day = days[now.getDay()];

h4.innerHTML = `<br>${day}<br>
${hours}:${minutes}`;

//challenge2

function form(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", form);
//bonus

function invertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 20;
}

let linkToCelsius = document.querySelector("#celsius-link");
linkToCelsius.addEventListener("click", invertToCelsius);

function invertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 68;
}
let linkToFahrenheit = document.querySelector("#fahrenheit-link");
linkToFahrenheit.addEventListener("click", invertToFahrenheit);

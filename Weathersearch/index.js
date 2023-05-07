//js function added
function formatDate(timestamp){
  let date=new Date(timestamp);
  let hours=date.getHours();
  if(hours<10){
    hours=`0${hours}`;
  }

  let minutes=date.getMinutes();
  if(minutes<10){
    minutes=`0${minutes}`;
  }
  let days=[
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
]
  let day=days[date.getDay()];
  return`${day}   ${hours}:${minutes}`;
}
function showForecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML= `<div class="row">`;
  let days=["Mon","Tue","Wed","Thurs","Fri","Sat"];
  days.forEach(function(day){
  forecastHTML= 
  forecastHTML + 
  `
  <div class="col">
    <div class="weather-forecast-date">
    ${day}
   </div>
  <img src="${day.condition.icon_url}"
  alt="" 
 width=60px/>
 <div class="weather-forecast-temperatures">
   <span class="weather-forecast-temperature-max">
    18
   </span>
   <span class="weather-forecast-temperature-min">
    12
    </span>
    </div>
   </div>
  `;
});
forecastHTML= forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;
console.log(forecastHTML);
}

function getForecast(position){
  let apiKey= "3e43c90o982f68c2f3431bc23d3bfa1t";
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}
  &appid=${apiKey}&units=metric`;

axios.get(apiURL).then(showForecast);
}

function displayTemperature(response){
  console.log(response.data);
  let temperatureElement=document.querySelector("#degrees");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let dateElement=document.querySelector("#date");
  let icon = response.data.condition.icon;
  let iconElement=document.querySelector("#icon");


  celsiusTemperature= Math.round(response.data.temperature.current);

  temperatureElement.innerHTML=Math.round(response.data.temperature.current);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElement.innerHTML=response.data.temperature.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML=formatDate(response.data.dt*1000);
  
  iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`);

  iconElement.setAttribute("alt",response.data.condition.description);
  getForecast(response.data.coord);
}

function search(city){
let apiKey="3e43c90o982f68c2f3431bc23d3bfa1t";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#degrees");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature * 9/ 5) + 32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
let celsiusTemperature= null;


function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement=document.querySelector("#degrees");
  temperatureElement.innerHTML=celsiusTemperature;
}


let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitlink=document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click",displayFahrenheitTemperature);

let celsiuslink=document.querySelector("#celsius-link");
celsiuslink.addEventListener("click",displayCelsiusTemperature);

search("New York");
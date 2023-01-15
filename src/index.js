function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();
  let currentYear = currentTime.getUTCFullYear();

  let date = document.querySelector("#date");
  date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return `${currentHour}:${currentMinute}`;
}

function showTemprature(response) {
  let city = document.querySelector("#name-city");
  city.innerHTML = response.data.name;

  let degree = document.querySelector("#degree");
  let temprature = Math.round(response.data.main.temp);
  degree.innerHTML = temprature;

  let tempratureDescription = document.querySelector("h2");
  tempratureDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  let humidityRate = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity:${humidityRate}%`;

  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windSpeed} Km/h`;

  let currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "dc738e44d776f0c7801fb0a941f76648";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  search(searchInput.value);
}

function showposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dc738e44d776f0c7801fb0a941f76648";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showposition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("celcius");
  fahrenheitLink.classList.add("celcius");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.add("celcius");
  fahrenheitLink.classList.remove("celcius");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("new York");

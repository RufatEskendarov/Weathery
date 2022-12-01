"use strict";

let searchList = [];
const searchSubmitBtn = document.getElementById("search-submit");
const cityNameInput = document.getElementById("city-name");
const currentWeatherContainer = document.getElementById(
  "current-weather-container"
);
const searchedCityList = document.getElementById("searched-city");
const weatherContainer = document.getElementById("current");
const fiveDayBrodcast = document.getElementById("broadcast-container");
const searchedCityBtns = document.getElementById("searched-btn");

const formSumbit = function (e) {
  e.preventDefault();
  let cityName = cityNameInput.value.trim();
  console.log(cityNameInput.value);
  if (cityName) {
    getCityWeather(cityName);
    // get5Day(cityName);
    searchList.unshift({ cityName });
    cityNameInput.value = "";
  } else {
    alert("Please enter a City");
  }
  //   saveSearchedCity();
  //   pastSearch(cityName);
  console.log(searchList);
};

const saveSearchedCity = function () {
  localStorage.setItem("cities", JSON.stringify(searchList));
};

const getCityWeather = function (city) {
  const apiKey = "c41089c13b9d3a93f5373eaf06e846f3";
  // var apiKey = "844421298d794574c100e3409cee0499";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayWeather(data, city);
    });
  });
};

const displayWeather = function (weather, searchCity) {
  //clear old content
  const html = `
    <h3 id="searched-city" class="text-warning">
      ${searchCity} (${moment(weather.dt.value).format(
    "MMM D, YYYY"
  )}) <img src ="https://openweathermap.org/img/wn/${
    weather.weather[0].icon
  }@2x.png">
    </h3>
    <div id="current-weather-container" class="list-group">
      <ul class="text-warning info">
        <li>Temperature: ${weather.main.temp} °F</li>
        <li>Humidity: ${weather.main.humidity}%</li>
        <li>Wind speed: ${weather.wind.speed} MPH</li>
      </ul>
    </div>
  `;

  weatherContainer.insertAdjacentHTML("afterbegin", html);
};

searchSubmitBtn.addEventListener("click", formSumbit);

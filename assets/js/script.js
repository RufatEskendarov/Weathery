"use strict";

let searchList = [];
const searchSubmitBtn = document.getElementById("search-submit");
const cityNameInput = document.getElementById("city-name");
const currentWeatherContainer = document.getElementById(
  "current-weather-container"
);
const container = document.getElementById("container");
const sectionList = document.getElementById("section-city-list");
const searchForm = document.getElementById("search-form");
const searchedCityList = document.getElementById("searched-city--list");
const weatherContainer = document.getElementById("current");
const fiveDayBrodcast = document.getElementById("broadcast-container");
const searchedCityBtns = document.querySelectorAll(".searched-btns");

const formSumbit = function (e) {
  e.preventDefault();
  container.classList.remove("hide");
  sectionList.classList.remove("hide");
  searchForm.classList.remove("corrector");
  let cityName = cityNameInput.value.trim();
  if (cityName) {
    getCityWeather(cityName);

    searchList.unshift({ cityName });
    cityNameInput.value = "";
  } else {
    return;
  }
  saveSearchedCity();
  prevSearchBtnCreator(cityName);
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

//Render Current and net 5 days weather
const displayWeather = function (weather, searchCity) {
  //clear previous content
  weatherContainer.innerHTML = "";
  cityNameInput.textContent = searchCity;

  //Render Current Weather
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
  fetchFiveDayWeather(searchCity);
};

//Featching data for searched city
const fetchFiveDayWeather = function (city) {
  var apiKey = "c41089c13b9d3a93f5373eaf06e846f3";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      renderFiveDayWeather(data);
    });
  });
};

//RENDER 5 Day Forecast
const renderFiveDayWeather = function (weather) {
  //clear previous content
  fiveDayBrodcast.innerHTML = "";

  const broadcast = weather.list;
  for (var i = 5; i < broadcast.length; i += 8) {
    let dailyBroadcast = broadcast[i];

    const html = `
    <section class="card col-2 bg-dark card-left">
        <ul class="text-warning info-card">
            <li>${moment.unix(dailyBroadcast.dt).format("MMM D, YYYY")}</li>
            <li>
                <img
                class="card-body"
                src="https://openweathermap.org/img/wn/${
                  dailyBroadcast.weather[0].icon
                }@2x.png"
            />
            </li>
            <li>Temperature: ${dailyBroadcast.main.temp} °F</li>
            <li>Humidity: ${dailyBroadcast.main.humidity}%</li>
            <li>Wind speed: ${dailyBroadcast.wind.speed} MPH</li>
        </ul>
    </section>`;

    fiveDayBrodcast.insertAdjacentHTML("beforeend", html);
  }
};

//Creating BTNS for searched Cities
const prevSearchBtnCreator = function (prevSearch) {
  const html = `
  <li class="searched-btns m-1 border border-secondary rounded" data-name="${prevSearch}">${prevSearch}</li>
    `;
  searchedCityList.insertAdjacentHTML("beforeend", html);
};

//Render info for searched cities
const renderPrevSearchedCity = function (event) {
  const city = event.target.getAttribute("data-name");

  if (city) {
    getCityWeather(city);
  }
};

//Handler for Search Submit button
searchSubmitBtn.addEventListener("click", formSumbit);

//Handler for previous city  rendering
searchedCityList.addEventListener("click", renderPrevSearchedCity);

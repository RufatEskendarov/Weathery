"use strict";

let searchList = [];
const searchSubmitBtn = document.querySelector("#search-submit");
const cityNameInput = document.querySelector("#city-name");
const weatherContainer = document.querySelector("#current-weather-container");
const searchedCityList = document.querySelector("#searched-city");

const fiveDayBrodcast = document.querySelector("#broadcast-container");
const searchedCityBtns = document.querySelector("#searched-btn");

const formSumbit = function (e) {
  e.preventDefault();
  const cityName = cityNameInput.value.trim();
  if (cityName) {
    // getCityWeather(cityName);
    // get5Day(cityName);
    searchList.unshift({ cityName });
    cityNameInput.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearchedCity();
  //   pastSearch(cityName);
  console.log(searchList);
};

const saveSearchedCity = function () {
  localStorage.setItem("cities", JSON.stringify(searchList));
};

searchSubmitBtn.addEventListener("click", formSumbit);

'use strict';
const API_KEY = 'YOUR_API_KEY_HERE';
const weather = document.querySelector('.js-weather');

const COORDS = 'coords';

function setSpanWeatherInfo(json) {
  weather.innerHTML = `${json.name} @  ${json.main.temp}℃`;
}

function getWeatherInfo(lon, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((json) => json.json())
    .then((json) => setSpanWeatherInfo(json));
}

function getGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  const geoObj = {
    longitude,
    latitude,
  };

  localStorage.setItem(COORDS, JSON.stringify(geoObj));
}

function getGeoError(error) {
  console.log(new Error(error));
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    const longitude = parsedCoords.longitude;
    const latitude = parsedCoords.latitude;
    //console.log(longitude, latitude);
    getWeatherInfo(longitude, latitude);
  }
}
function init() {
  loadCoords();
}

init();

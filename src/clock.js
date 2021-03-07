'use strict';
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('.title-clock');
const day = clockContainer.querySelector('.day');

function getTime() {
  const date = new Date();
  const minuites = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const weekDay = date.getDay();
  //   if (seconds < 10) {
  //     clockTitle.innerHTML = `${hours}:${minuites}:0${seconds}`;
  //   } else {
  //     clockTitle.innerHTML = `${hours}:${minuites}:${seconds}`;
  //   }
  day.innerHTML = WEEK[weekDay];
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minuites < 10 ? `0${minuites}` : minuites
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

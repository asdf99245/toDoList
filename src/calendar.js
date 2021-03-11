'use strict';

const calContainer = document.querySelector('.calendar-container');
const calDate = calContainer.querySelector('.date');
const calBody = calContainer.querySelector('tbody');
const prevBtn = calContainer.querySelector('.prevBtn');
const nextBtn = calContainer.querySelector('.nextBtn');
const TODAY = new Date();
let date = new Date();

function getDays(year, month) {
  if (month === 2) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return 29;
        } else {
          return 28;
        }
      } else {
        return 28;
      }
    } else {
      return 28;
    }
  } else {
    if (month % 2 === 1) {
      return 31;
    } else return 30;
  }
}

function removeCalendar() {
  for (let i = 0; i < 6; i++) {
    calBody.deleteRow(-1);
  }
}

function getCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const day = firstDay.getDay();
  let cnt = 1;

  for (let i = 0; i < 6; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const td = document.createElement('td');
      if ((i === 0 && j >= day) || (i !== 0 && cnt <= getDays(year, month + 1))) {
        td.innerHTML = cnt;
        if (year === TODAY.getFullYear() && month === TODAY.getMonth() && cnt === TODAY.getDate()) {
          //console.log(year, month, cnt);
          td.classList.add('today');
        }
        td.setAttribute('id', cnt);
        cnt += 1;

        if (j === 0) {
          td.classList.add('sun');
        }

        if (j === 6) {
          td.classList.add('sat');
        }
      }
      tr.appendChild(td);
    }

    calBody.appendChild(tr);
  }
}

function getPrev(year, month) {
  removeCalendar();
  if (month === 0) {
    const prevYear = year - 1;
    const prevMonth = 11;
    date = new Date(prevYear, prevMonth, 1);
    loadCalDate();
  } else {
    const prevYear = year;
    const prevMonth = month - 1;
    date = new Date(prevYear, prevMonth, 1);
    loadCalDate();
  }
}

function getNext(year, month) {
  removeCalendar();
  if (month === 11) {
    const nextYear = year + 1;
    const nextMonth = 0;
    date = new Date(nextYear, nextMonth, 1);
    loadCalDate();
  } else {
    const nextYear = year;
    const nextMonth = month + 1;
    date = new Date(nextYear, nextMonth, 1);
    loadCalDate();
  }
}

function onButtonClick() {
  prevBtn.addEventListener('click', (event) => getPrev(date.getFullYear(), date.getMonth()));
  nextBtn.addEventListener('click', (event) => getNext(date.getFullYear(), date.getMonth()));
}

function loadCalDate() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  calDate.innerHTML = `${year}년 ${month + 1}월`;
  getCalendar(year, month);
}

function init() {
  onButtonClick();
  loadCalDate();
}

init();

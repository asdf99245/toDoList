'use strit';
const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greetings = document.querySelector('.js-greetings');

const USER_LS = 'currentUser';

function askForName() {
  form.classList.add('showing');
  form.addEventListener('submit', () => {
    const currentValue = input.value;
    localStorage.setItem(USER_LS, currentValue);
    renderGreeting(currentUser);
  });
}

function renderGreeting(currentUser) {
  form.classList.remove('showing');
  greetings.classList.add('showing');
  return `Hello, ${currentUser} !`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    greetings.innerHTML = renderGreeting(currentUser);
  }
}
function init() {
  loadName();
}

init();

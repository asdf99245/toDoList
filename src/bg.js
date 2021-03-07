'use strict';

const body = document.querySelector('body');
const IMG_NUMBER = 3;

function renderImage(img_number) {
  const img = new Image();
  img.src = `img/${img_number}.jpg`;
  img.classList.add('bgImage');
  body.prepend(img);
}
function genRandom() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}
function init() {
  const randomNumber = genRandom();
  renderImage(randomNumber);
}
init();

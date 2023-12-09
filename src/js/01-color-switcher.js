function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const INTERVAL_DELAY = 1000;
const buttonStartElem = document.querySelector('[data-start]');
const buttonStopElem = document.querySelector('[data-stop]');
const bodyElem = document.body;

buttonStartElem.addEventListener('click', onButtonStartElemClick);
buttonStopElem.addEventListener('click', onButtonStopElemClick);

buttonStopElem.disabled = true;

let intervalId;

function onButtonStartElemClick() {
  intervalId = setInterval(() => {
    bodyElem.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  buttonStartElem.disabled = true;
  buttonStopElem.disabled = false;
}

function onButtonStopElemClick() {
  clearInterval(intervalId);
  buttonStopElem.disabled = true;
  buttonStartElem.disabled = false;
}

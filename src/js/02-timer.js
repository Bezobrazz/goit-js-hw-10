import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const inputElem = document.querySelector('#datetime-picker');
const buttonStartElem = document.querySelector('[data-start]');

buttonStartElem.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const isPastDate = selectedDates[0] < new Date();
    if (isPastDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStartElem.disabled = false;
      Notiflix.Notify.success('You can start a timer now');
    }
  },
};

const flatpickrInstance = flatpickr(inputElem, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let countdownInterval;

function startCountdown(targetDate) {
  let timeDifference = targetDate - new Date().getTime();

  if (timeDifference <= 0) {
    updateTimerDisplay(convertMs(0));
    clearInterval(countdownInterval);
    return;
  }

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay({ days, hours, minutes, seconds });

    timeDifference -= 1000;

    if (timeDifference <= 0) {
      updateTimerDisplay(convertMs(0));
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

buttonStartElem.addEventListener('click', onButtonStartElemClick);

function onButtonStartElemClick() {
  const selectedDate = flatpickrInstance.selectedDates[0].getTime();
  startCountdown(selectedDate);
}

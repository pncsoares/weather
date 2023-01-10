import { ICON_MAP } from './iconMap';
import { getWeather } from './weather';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(renderWeather)
    .catch((e) => {
      console.error(e);
      alert('Error getting weather.');
    });
}

function positionError(position) {
  alert(
    'There was an error getting your location. Please allow us to use your location and refresh the page.'
  );
}

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);

  document.body.classList.remove('blurred');
}

const currentIcon = document.querySelector('[data-current-icon]');

function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode);

  setValue('current-temp', current.currentTemp);
  setValue('current-high', current.highTemp);
  setValue('current-low', current.lowTemp);
  setValue('current-fl-high', current.highFeelsLike);
  setValue('current-fl-low', current.lowFeelsLike);
  setValue('current-wind', current.windSpeed);
  setValue('current-precip', current.precip);
}

const dailySection = document.querySelector('[data-day-section]');
const dayCardTemplate = document.getElementById('day-card-template');

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' });

function renderDailyWeather(daily) {
  dailySection.innerHTML = '';

  daily.forEach((day) => {
    const dayCard = dayCardTemplate.content.cloneNode(true);

    setValue('temp', day.maxTemp, { parent: dayCard });
    setValue('date', DAY_FORMATTER.format(day.timestamp), { parent: dayCard });

    dayCard.querySelector('[data-icon]').src = getIconUrl(day.iconCode);

    dailySection.append(dayCard);
  });
}

const hourlySection = document.querySelector('[data-hour-section]');
const hourRowTemplate = document.getElementById('hour-card-template');

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { timeStyle: 'short', hour12: false });

function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = '';

  hourly.forEach((hour) => {
    const hourCard = hourRowTemplate.content.cloneNode(true);

    setValue('temp', hour.temp, { parent: hourCard });
    setValue('fl-temp', hour.feelsLike, { parent: hourCard });
    setValue('wind', hour.windSpeed, { parent: hourCard });
    setValue('precip', hour.precip, { parent: hourCard });
    setValue('day', DAY_FORMATTER.format(hour.timestamp), { parent: hourCard });
    setValue('time', HOUR_FORMATTER.format(hour.timestamp), { parent: hourCard });

    hourCard.querySelector('[data-icon]').src = getIconUrl(hour.iconCode);

    hourlySection.append(hourCard);
  });
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `./icons/${ICON_MAP.get(iconCode)}.svg`;
}

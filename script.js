const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "fb8f2941e4c1d10555574bd1eb0dc306";
  const city = document.querySelector(".search-box input").value.trim();
  if (city === "") return; 
 
// used open weather map api
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        displayError(city);  
        return;
      }

      console.log("API Response:", json); 
      updateWeatherInfo(json, city); 
    })
    .catch((error) => console.error("Error fetching data:", error));  
});
function displayError(city) {
  cityHide.textContent = city;
  container.style.height = "400px";
  weatherBox.classList.remove("active");
  weatherDetails.classList.remove("active");
  error404.classList.add("active");
}
function updateWeatherInfo(json, city) {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .decription");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");
  if (cityHide.textContent === city) return;

  cityHide.textContent = city;
  container.style.height = "555px";
  weatherBox.classList.add("active");
  weatherDetails.classList.add("active");
  error404.classList.remove("active");

  setTimeout(() => container.classList.remove("active"), 2500);

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "/images/clear.png";
      break;
    case "Rain":
      image.src = "/images/rain.png";
      break;
    case "Snow":
      image.src = "/images/snow.png";
      break;
    case "Clouds":
      image.src = "/images/cloud.png";
      break;
    case "Mist":
    case "Haze":
      image.src = "/images/mist.png";
      break;
    default:
      image.src = "/images/cloud.png";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
  description.innerHTML = json.weather[0].description;

  if (json.main && json.main.humidity !== undefined) {
    humidity.innerHTML = `${json.main.humidity}%`;  
  } else {
    console.warn("Humidity data not available.");
    humidity.innerHTML = "N/A";  
  }

  const windSpeedInKmh = (json.wind.speed * 3.6).toFixed(1);
  wind.innerHTML = `${windSpeedInKmh} Km/h`;  // Display wind speed in km/h

  manageClonedElements();
}

function manageClonedElements() {
  const infoWeather = document.querySelector(".info-weather");
  const infoHumidity = document.querySelector(".info-humidity");
  const infoWind = document.querySelector(".info-wind");

  const elCloneInfoWeather = infoWeather.cloneNode(true);
  const elCloneInfoHumidity = infoHumidity.cloneNode(true);
  const elCloneInfoWind = infoWind.cloneNode(true);

  elCloneInfoWeather.id = "clone-info-weather";
  elCloneInfoWeather.classList.add("active-clone");

  elCloneInfoHumidity.id = "clone-info-humidity";
  elCloneInfoHumidity.classList.add("active-clone");

  elCloneInfoWind.id = "clone-info-wind";
  elCloneInfoWind.classList.add("active-clone");

  setTimeout(() => {
    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
  }, 2200);

  removeOldClones();
}

function removeOldClones() {
  const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
  const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
  const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");

  if (cloneInfoWeather.length > 0) {
    setTimeout(() => {
      cloneInfoWeather[0].remove();
      cloneInfoHumidity[0].remove();
      cloneInfoWind[0].remove();
    }, 2200);
  }
}

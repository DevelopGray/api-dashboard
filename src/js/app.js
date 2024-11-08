// Import API functions
import { fetchLocation } from "./api/geolocationAPI.js";
import { fetchWeatherData } from "./api/weatherAPI.js";
import { fetchRandomQuote } from "./api/quotesAPI.js";
import { fetchBitcoin } from "./api/bitcoinAPI.js";
import { fetchImage } from "./api/imageAPI.js";

// Save the last focused element when opening a modal
let lastFocusedElement;

// Manage focus on modal open and close for accessibility
document
  .getElementById("settingsModal")
  .addEventListener("show.bs.modal", () => {
    lastFocusedElement = document.activeElement; // Store last focused element
  });
document
  .getElementById("settingsModal")
  .addEventListener("hidden.bs.modal", () => {
    if (lastFocusedElement) lastFocusedElement.focus(); // Return focus to the triggering element
  });

// Module references for easier access to each section
const modules = {
  weather: document.querySelector(".card:has(#weather-content)"),
  image: document.querySelector(".card:has(#image-content)"),
  quotes: document.querySelector(".card:has(#quote-content)"),
  bitcoin: document.querySelector(".card:has(#bitcoin-content)"),
};

// Function to show a loading spinner while content loads
function addSpinner(element) {
  element.innerHTML = `
    <div class="spinner-border text-primary" role="status" aria-label="Loading">
      <span class="visually-hidden">Loading...</span>
    </div>`;
}

// Function to clear the loading spinner when data is loaded
function removeSpinner(element) {
  element.innerHTML = "";
}

// Reusable function to set module content with error handling
async function setModuleContent(
  id,
  fetchFunction,
  successCallback,
  errorMessage
) {
  const contentElement = document.getElementById(id);
  addSpinner(contentElement); // Show spinner while fetching data
  try {
    const data = await fetchFunction();
    removeSpinner(contentElement); // Remove spinner once data is fetched
    if (data) successCallback(contentElement, data); // Display data
    else contentElement.innerHTML = `<p>${errorMessage}</p>`;
  } catch (error) {
    removeSpinner(contentElement); // Handle fetch errors
    contentElement.innerHTML = `<p>${errorMessage} (Please try again later.)</p>`;
  }
}

// Fetch and display weather data with location and weather information
async function displayWeather() {
  // Step 1: Fetch user location
  const location = await fetchLocation();
  const weatherContent = document.getElementById("weather-content");

  if (!location) {
    weatherContent.innerHTML = "Failed to load location.";
    return;
  }

  // Step 2: Fetch weather data based on user's coordinates
  const weatherData = await fetchWeatherData(
    location.latitude,
    location.longitude
  );

  if (weatherData) {
    // Step 3: Update the DOM with location and weather data
    weatherContent.innerHTML = `
        <h3>${location.city}, ${location.region}</h3>
        <p>Coordinates: ${location.latitude.toFixed(
          2
        )}, ${location.longitude.toFixed(2)}</p>
        <p><i class="fas fa-thermometer-half"></i> Temperature: ${
          weatherData.current.temperature
        }°F</p>
        <p><i class="fas fa-fire"></i> Feels Like: ${
          weatherData.current.apparentTemperature
        }°F</p>
        <p><i class="fas fa-tint"></i> Humidity: ${
          weatherData.current.humidity
        }%</p>
        <p><i class="fas fa-cloud-rain"></i> Precipitation: ${
          weatherData.current.precipitation
        } inches</p>
        <p><i class="fas ${
          weatherData.current.isDay === "1" ? "fa-sun" : "fa-moon"
        }"></i> ${
      weatherData.current.isDay === "1" ? "Daytime" : "Nighttime"
    }</p>
    `;
  } else {
    weatherContent.innerHTML = "Failed to load weather data.";
  }
}

// Fetch and display a random quote
function displayQuote() {
  setModuleContent(
    "quote-content",
    fetchRandomQuote,
    (el, data) => {
      el.innerHTML = `<p><i class="fas fa-quote-left"></i> ${data.quote} <i class="fas fa-quote-right"></i></p><p>- ${data.character}</p>`;
    },
    "Failed to load quote."
  );
}

// Fetch and display current Bitcoin price
function displayBitcoin() {
  setModuleContent(
    "bitcoin-content",
    fetchBitcoin,
    (el, price) => {
      el.innerHTML = `<p>Current Bitcoin Price: $${price}</p>`;
    },
    "Failed to load Bitcoin price."
  );
}

// Fetch and display a random image
function displayRandomImage() {
  setModuleContent(
    "image-content",
    fetchImage,
    (el, imageData) => {
      el.innerHTML = `
            <div style="text-align: center;">
                <a href="${imageData.author_url}"><img src="${imageData.url}" alt="Random Image" style="max-width: 100%; height: auto;"></a>
                <p>Image by <a href="${imageData.author_url}" target="_blank">${imageData.author}</a></p>
            </div>
        `;
    },
    "Failed to load image."
  );
}

// Initialize module visibility based on localStorage settings
function initializeModules() {
  Object.keys(modules).forEach((moduleName) => {
    const display = localStorage.getItem(`${moduleName}Module`) !== "false";
    modules[moduleName].style.display = display ? "block" : "none";
  });
}

// Save visibility settings for each module
function saveModuleSettings() {
  ["weather", "image", "quotes", "bitcoin"].forEach((moduleName) => {
    const isChecked = document.getElementById(
      `${moduleName}ModuleToggle`
    ).checked;
    localStorage.setItem(`${moduleName}Module`, isChecked);
    modules[moduleName].style.display = isChecked ? "block" : "none";
  });
}

// Event listener to prepare settings modal with saved values
document
  .getElementById("settingsModal")
  .addEventListener("show.bs.modal", () => {
    ["weather", "image", "quotes", "bitcoin"].forEach((moduleName) => {
      document.getElementById(`${moduleName}ModuleToggle`).checked =
        modules[moduleName].style.display === "block";
    });
  });

// Trigger to save settings when the user clicks the "Save changes" button
document
  .querySelector(".btn-primary")
  .addEventListener("click", saveModuleSettings);

// Toggle between light and dark themes
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  loadTheme();
}

// Load saved theme on page load and apply to navbar, cards, and footer
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply theme to the body
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(`${savedTheme}-theme`);

  // Apply theme to the navbar, if it exists
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.remove("light-theme", "dark-theme");
    navbar.classList.add(`${savedTheme}-theme`);
  }

  // Apply theme to each card
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("light-theme", "dark-theme");
    card.classList.add(`${savedTheme}-theme`);
  });

  // Apply theme to the footer, if it exists
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.remove("light-theme", "dark-theme");
    footer.classList.add(`${savedTheme}-theme`);
  }
}

// Event listeners to initialize modules, themes, and content loading
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", () => {
  initializeModules();
  loadTheme();
  displayWeather();
  displayQuote();
  displayBitcoin();
  displayRandomImage();
});

// Hide specific modules and update settings in localStorage
window.hideModule = function (moduleName) {
  const moduleElement = document.getElementById(`${moduleName}-module`);
  if (moduleElement) {
    moduleElement.style.display = "none";
    document.getElementById(`${moduleName}ModuleToggle`).checked = false;
    localStorage.setItem(`${moduleName}Module`, "false");
  }
};

// Sortable.js setup for drag-and-drop functionality in module layout
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".row");
  Sortable.create(container, {
    animation: 150,
    ghostClass: "sortable-ghost",
    onEnd: () => saveModuleOrder(),
  });
});

// Save module order after rearranging
function saveModuleOrder() {
  const moduleOrder = Array.from(document.querySelectorAll(".row .card")).map(
    (module) => module.id
  );
  localStorage.setItem("moduleOrder", JSON.stringify(moduleOrder));
}

// Load module order from localStorage and apply on page load
function loadModuleOrder() {
  const moduleOrder = JSON.parse(localStorage.getItem("moduleOrder"));
  if (moduleOrder) {
    const container = document.querySelector(".row");
    moduleOrder.forEach((moduleId) => {
      const module = document.getElementById(moduleId);
      if (module) container.appendChild(module);
    });
  }
}
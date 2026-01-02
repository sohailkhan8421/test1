const apiKey = "YOUR_API_KEY_HERE";

// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// Button Click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

// API Call
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherResult.innerHTML = `<p style="color:red">City not found!</p>`;
            return;
        }

        displayWeather(data);

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red">Error fetching data</p>`;
    }
}

// Display Weather
function displayWeather(data) {
    const html = `
        <div class="weather-box">
            <h3>${data.name}, ${data.sys.country}</h3>
            <h1>${data.main.temp}°C</h1>
            <p>${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        </div>
    `;

    weatherResult.innerHTML = html;
}

/**
 * Fetches current weather data based on given latitude and longitude.
 * @param {number} latitude - Latitude of the location.
 * @param {number} longitude - Longitude of the location.
 * @returns {Promise<Object|null>} - An object with weather data or null if an error occurs.
 */
export async function fetchWeatherData(latitude, longitude) {
  const options = {
    method: "GET",
    url: "https://api.open-meteo.com/v1/forecast",
    params: {
      latitude,
      longitude,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation",
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      precipitation_unit: "inch",
      timezone: "auto",
    },
  };

  try {
    const { data } = await axios.request(options);

    return {
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        timezoneAbbreviation: data.timezone_abbreviation,
      },
      current: {
        time: new Date(data.current.time), // Optional: Converts to date object
        temperature: data.current.temperature_2m, // Fahrenheit temperature
        apparentTemperature: data.current.apparent_temperature, // Feels-like temperature
        humidity: data.current.relative_humidity_2m, // Humidity in percentage
        precipitation: data.current.precipitation, // Precipitation in inches
        isDay: data.current.is_day === 1 ? "Day" : "Night", // Checks if it's daytime
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

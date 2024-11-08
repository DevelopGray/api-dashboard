/**
 * Fetches approximate location data (latitude, longitude, city, region) based on the user's IP address.
 * @returns {Promise<Object|null>} - An object with city, region, latitude, and longitude, or null on error.
 */
export async function fetchLocation() {
  try {
    const response = await axios.get("https://ipinfo.io/json");
    const [latitude, longitude] = response.data.loc.split(",");

    return {
      city: response.data.city,
      region: response.data.region,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

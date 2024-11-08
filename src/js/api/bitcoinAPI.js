/**
 * Fetches the current Bitcoin price in USD using the Coindesk API.
 * @returns {Promise<string|null>} - Returns the Bitcoin price as a string or null if an error occurs.
 */
export async function fetchBitcoin() {
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
    );
    const bitcoinPrice = response.data.bpi.USD.rate; // Extracts the USD price from the response
    return bitcoinPrice;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return null;
  }
}

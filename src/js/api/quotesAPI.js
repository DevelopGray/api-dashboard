/**
 * Fetches a random quote from Game of Thrones characters using an external API.
 * @returns {Promise<Object|null>} - An object with the quote and character's name, or null on error.
 */
export async function fetchRandomQuote() {
  try {
    const response = await axios.get(
      "https://api.gameofthronesquotes.xyz/v1/random"
    );
    const quoteData = response.data;

    return {
      quote: quoteData.sentence,
      character: quoteData.character.name,
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

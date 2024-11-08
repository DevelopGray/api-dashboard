/**
 * Fetches a random image and details using the Picsum Photos API.
 * @param {number} width - Width of the image to request.
 * @param {number} height - Height of the image to request.
 * @returns {Promise<Object|null>} - An object with image URL, author, and author URL, or null on error.
 */
export async function fetchImage(width = 600, height = 400) {
  try {
    // Fetch a random image to get the image ID from the header
    const response = await axios.get(
      `https://picsum.photos/${width}/${height}`,
      { responseType: "blob" }
    );
    const imageId = response.headers["picsum-id"];

    // Fetch image details using the image ID
    const infoResponse = await axios.get(
      `https://picsum.photos/id/${imageId}/info`
    );
    const imageData = infoResponse.data;

    return {
      url: imageData.download_url,
      author: imageData.author,
      author_url: imageData.url,
    };
  } catch (error) {
    console.error("Error fetching random image:", error);
    return null;
  }
}

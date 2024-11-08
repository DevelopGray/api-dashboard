# API Dashboard

A customizable API dashboard that provides real-time weather updates, random images, Bitcoin prices, and Game of Thrones quotes. This project showcases API integrations, a light/dark theme toggle, and drag-and-drop functionality for module arrangement.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **Weather Module**: Displays real-time weather data based on user location.
- **Image Module**: Shows random images with attribution.
- **Bitcoin Module**: Provides up-to-date Bitcoin prices.
- **Quotes Module**: Displays a random Game of Thrones quote.
- **Light/Dark Theme**: Toggle between light and dark modes for a better user experience.
- **Drag-and-Drop**: Rearrange modules with drag-and-drop functionality, which saves the layout in `localStorage`.
- **Settings**: Choose which modules to display and save preferences in `localStorage`.

## Project Structure

```plaintext
api-dashboard/
├── favicon.ico
├── index.html                  # Main HTML file
├── src/
│   ├── css/
│   │   ├── styles.css          # Custom styles
│   │   └── themes.css          # Light/Dark theme styles
│   ├── js/
│   │   ├── app.js              # Main JavaScript application logic
│   │   ├── api/
│   │   │   ├── bitcoinAPI.js   # Fetches Bitcoin data
│   │   │   ├── geolocationAPI.js # Fetches user location
│   │   │   ├── imageAPI.js     # Fetches random image
│   │   │   ├── quotesAPI.js    # Fetches random quote
│   │   │   └── weatherAPI.js   # Fetches weather data
```

## Technologies Used

- **HTML/CSS**: Structure and styling.
- **JavaScript (ES6)**: Core logic, API requests, theme toggling, and drag-and-drop functionality.
- **Bootstrap**: For responsive design and easy styling.
- **Axios**: To handle API requests.
- **SortableJS**: To enable drag-and-drop module rearrangement.

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/api-dashboard.git
   cd api-dashboard
   ```

2. **Open `index.html`**:
   Open the `index.html` file in a web browser to view the dashboard.

3. **Dependencies**:
   Ensure internet connectivity for external libraries (Bootstrap, Axios, Font Awesome, SortableJS).

## Usage

- **Modules**:

  - Weather: Displays current weather based on IP location.
  - Image: Shows a random image from the Picsum Photos API.
  - Bitcoin: Shows the current Bitcoin price in USD.
  - Quotes: Displays a random Game of Thrones quote.

- **Theme Toggle**: Click the "Toggle Theme" button to switch between light and dark modes.
- **Settings Modal**:
  - Open settings by clicking "Settings" in the navbar.
  - Choose which modules to display by checking/unchecking the options.
  - Click "Save changes" to apply and save preferences.
- **Drag-and-Drop**: Rearrange modules by dragging them. The arrangement is saved in `localStorage`.

## Future Improvements

- **Add More APIs**: Integrate additional APIs to expand functionality (e.g., news, stock prices).
- **User Authentication**: Add user accounts for personalized module settings and theme preferences.
- **Enhanced Error Handling**: Improve error messages and fallback mechanisms for failed API requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

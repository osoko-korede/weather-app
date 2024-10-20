import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); // New state for error handling
  const apiKey = 'a8e611acb37e33f3be7c7a4d34d0e33f'; // Replace with your real API key

  const getWeather = async () => {
    if (city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
          setWeather(data); // Set the weather data
          setError(null);   // Clear any previous errors
        } else {
          setError(data.message); // Handle errors (e.g., city not found)
          setWeather(null);       // Clear the weather data if there's an error
        }
      } catch (err) {
        setError('Failed to fetch data'); // Handle network errors
        setWeather(null);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-blue-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Check Weather</h1>
        
        {/* Input for the city */}
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* Button to get weather */}
        <button
          onClick={getWeather}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Get Weather
        </button>

        {/* Display error message */}
        {error && (
          <div className="mt-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Display weather info */}
        {weather && !error && (
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-white">{weather.name}</h2>
            <p className="text-lg text-blue-500 pt-7">Temperature:</p>
            <p className="text-5xl text-white font-semibold">{weather.main.temp}°C</p>
            <p className="text-lg text-blue-500 pt-7">Weather:</p>
            <p className="text-3xl text-white font-semibold">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

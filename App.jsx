import './App.css';
import React, { useEffect, useState } from "react";
import Information from './components/Information';
import Temperature from './components/Temperature';

function App() {
  // State to hold the selected city, default is "New Delhi"
  const [city, setCity] = useState("New Delhi");

  // State to hold the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // useEffect hook to fetch weather data whenever the city changes
  useEffect(() => {
    // API URL with the weather data for the selected city
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=4b12f51987f44cb69a2171016242804&q=${city}&aqi=no`;

    // Fetch weather data from the API
    fetch(apiURL)
      .then((response) => {
        // Check if the response is not OK, throw an error if true
        if (!response.ok) {
          throw new Error("Error");
        }
        // Convert the response to JSON format
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data to the console
        setWeatherData(data); // Update state with the fetched data
      })
      .catch((e) => {
        console.log(e); // Log any errors that occur during the fetch
      });
  }, [city]); // Dependency array with `city`, triggers the effect when `city` changes

  return (
    // Main container with background styling
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
      <div className='mt-40 w-1/5 h-1/3'>
        {/* Render the Temperature component if weather data is available */}
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c, // Current temperature in Celsius
              condition: weatherData.current.condition.text, // Current weather condition
              isDay: weatherData.current.is_day, // Day or night indicator
              location: weatherData.location.name, // Location name
              time: weatherData.location.localtime // Local time at the location
            }}
          />
        )}
      </div>

      <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        {/* Title for the highlights section */}
        <h2 className='text-slate-200 text-2xl col-span-2'>
          Today's HighLights
        </h2>

        {/* Render Information components if weather data is available */}
        {weatherData && (
          <>
            <Information
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph, // Wind speed in mph
                unit: "mph",
                direction: weatherData.current.wind_dir // Wind direction
              }}
            />

            <Information
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity, // Humidity percentage
                unit: "%"
              }}
            />

            <Information
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles, // Visibility in miles
                unit: "miles"
              }}
            />

            <Information
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb, // Air pressure in mb
                unit: "mb"
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;



     
        
        

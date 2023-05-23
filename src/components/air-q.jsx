import React, { useState } from 'react';
import axios from 'axios';

const AirQ = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);

  const api_key = process.env.REACT_APP_AIR_VISUAL_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const trimmedState = state.trim();
    try {
      const citiesResponse = await axios.get(
        `https://api.airvisual.com/v2/cities?state=${trimmedState}&country=USA&key=${api_key}`
      );
      const citiesData = citiesResponse.data;
  
      // Check if city is available in the list of cities
      const matchedCity = citiesData.data.find((c) => c.city.toLowerCase() === trimmedCity.toLowerCase());
      if (!matchedCity) {
        setError('City not found.');
        return;
      }
  
      const response = await axios.get(`https://air-q-2023.wl.r.appspot.com/api/aq?city=${matchedCity.city}&state=${trimmedState}`);
      const data = response.data;
  
      if (data.status === 'success') {
        setAirQualityData(data.data);
        setError(null);
      } else {
        setError('Failed to retrieve air quality data.');
      }
    } catch (err) {
      console.log(err);
      setError('Huh. Something went wrong.');
    }
  };
  

  const showAirQualityData = airQualityData !== null;

  const getAqiColor = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'green';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'yellow';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'orange';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'red';
    }
    return '';
  };

  const getAqiText = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'Good';
    } else if (aqi >= 51 && aqi <= 100) {
      return 'Moderate';
    } else if (aqi >= 101 && aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi >= 151 && aqi <= 200) {
      return 'Unhealthy';
    }
    return '';
  };

  return (
    <>
      {!showAirQualityData ? (
        <div className="dash-container">
          <div className="dash-intro">
            <h1 className="dash-title">Welcome to Air Q</h1>
            <p className="dash-text">Track the air quality in your neighborhood.</p>
          </div>
          <div>
            <form className="dash-form" onSubmit={handleSubmit}>
              <input
                className="dash-input"
                type="text"
                placeholder="Enter a city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
                <input
                className="dash-input"
                type="text"
                placeholder="Enter a state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <button className="dash-button" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="response-container">
          <div className="response">
            <h2 className="response-title">Air Quality Index</h2>
            <p className="response-text-city">{airQualityData.city}</p>
            <p className="response-text-aqi">
              {airQualityData.current.pollution.aqius}
            </p>
            <p className={`response-text-aqi-text ${getAqiColor(airQualityData.current.pollution.aqius)}`}>
              {getAqiText(airQualityData.current.pollution.aqius)}
            </p>
            <p className="response-text-time">
              {new Date(airQualityData.current.weather.ts).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </p>
            <p className="response-text-date">
              {new Date(airQualityData.current.weather.ts).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // Custom function to add 'st', 'nd', 'rd', 'th' suffix to the day
                daySuffix: (day) => {
                  if (day >= 11 && day <= 13) {
                    return 'th';
                  }
                  const lastDigit = day % 10;
                  if (lastDigit === 1) {
                    return 'st';
                  } else if (lastDigit === 2) {
                    return 'nd';
                  } else if (lastDigit === 3) {
                    return 'rd';
                  }
                  return 'th';
                },
              })}
            </p>
          </div>
        </div>
      )}
  
      {error && (
        <div className="error-container">
          <p className="error-text">{error}</p>
        </div>
      )}
    </>
  );
      };
      
        export default AirQ;
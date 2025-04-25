import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Style.css";

const CityWeather = () => {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState('');

  const API_KEY = "d2fe699705624775d97d8dfaa698b0a0";

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setCity('')

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      alert("city not found");
    }
    setLoading(false);
  };
  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
        <h1>Weather App</h1>
          <label htmlFor="city">Enter City name</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="enter city name"
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div className="result">
      {loading && <p className="para">Loading...</p>}
        {weather && (
          <div className="weather-info">
            <h3>{weather.name}</h3>
            <p>Temp: {weather.main.temp}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p> 
          </div>
        )}
      </div>
    </>
  );
};

export default CityWeather;

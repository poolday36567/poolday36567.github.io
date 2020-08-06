const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// All the functions that do shit
const convertToFarenheit = kelvinTemp => {
    let first = kelvinTemp - 273.15;
    return Math.round((first * (9/5)) + 32);
}

const extract = data => {
    return {
        weather: data.weather[0].id,
        specificWeather: data.weather[0].description,
        temp: convertToFarenheit(data.main.temp),
        feelsLike: convertToFarenheit(data.main.feels_like),
        tempMin: convertToFarenheit(data.main.temp_min),
        tempMax: convertToFarenheit(data.main.temp_max),
        humidity: data.main.humidity,
        clouds: data.clouds.all
    }; 
}

const fetchWeather = async () => {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=38.992460&lon=-77.099580&appid=b8bb1fd38a86b129aee2eda4b48d548f')
    let data = await response.json();
    return extract(data);
}

const splitToDigit = n => {
    return [...n + ''].map(Number)
}

const checkRainOrStorm = weatherID => {
    let firstDigitID = splitToDigit(weatherID)[0];
    if (firstDigitID === 2 || firstDigitID === 3 || firstDigitID === 5 || firstDigitID === 6) {
        return true;
    } else {
        return false;
    }
} 

const getPoolDay = (formattedData) => {
    let pool = true;
    if (formattedData.feelsLike <= 72 || formattedData >= 98) pool = false;
    if (formattedData.humidity >= 95) pool = false;
    if (formattedData.clouds >= 85) pool = false;
    if (checkRainOrStorm(formattedData.weather) === true) pool = false;
    return pool;
}

// setup the express server
const app = express();
app.use(cors());
app.listen(3002, () => { console.log('Express server is running on port 3002') });

// Express paths
app.get('/weather', (req, res, next) => {
    console.log('request received');
    fetchWeather()
        .then(data => res.send(data));
});

app.get('/pool', (req, res, next) => {
    console.log('request received');
    fetchWeather()
        .then(data => res.send(getPoolDay(data)));
});
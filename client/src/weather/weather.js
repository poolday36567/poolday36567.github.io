import React from 'react';
import Widget from './widget/widget';
import './weather.css';

class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: [],
            counter: 0
        }
        this.getData = this.getData.bind(this);
        this.convertIdToWeather = this.convertIdToWeather.bind(this);
        this.splitToDigit = this.splitToDigit.bind(this);
    }
    getData () {
        if (this.state.counter < 1) {
            fetch('http://localhost:3002/weather')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    api: data,
                    counter: 1
                });
            });
        }
    }
    splitToDigit = n => {
        return [...n + ''].map(Number)
    }
    convertIdToWeather (id) {
        let first = this.splitToDigit(id)[0]
        if (id === 800) return 'Clear Skys';
        if (first === 2) return 'Thunderstorms';
        if (first === 3) return 'Drizzle';
        if (first === 5) return 'Rain';
        if (first === 6) return 'Snow';
        if (first === 7) return 'Atmospheric Event';
        if (first === 8) return 'Clouds';
    }
    render() {
        this.getData();
        let api = this.state.api;
        let degree = '°';
        return (
            <div className='weather-container'>
                <Widget primary={this.convertIdToWeather(api.weather)} secondary={api.specificWeather} />
                <Widget primary={`${api.temp}${degree}`} secondary={`Feels like ${api.feelsLike}${degree}`} other1={`Low: ${api.tempMin}${degree}`} other2={`High: ${api.tempMax}${degree}`} />
                <Widget primary={`${api.clouds}% clouds`} secondary={`${api.humidity}% humidity`} />
            </div>
        );
    }
}

export default WeatherContainer;
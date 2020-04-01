// TODO: make the home screen weather display here
import React from 'react';
import {prefix0} from '../lib/helpers.js';

// function component to display the main information on the home screen
export default function WeatherHome(props) {

    // don't render if weather not fetched
    if(props.weather == null){
        return("");
    }

    const today = convertZones(props.weather);
    const temperature = props.weather.main.temp;
    const weatherDescription = props.weather.weather[0].description;

    return(
        <div>
            <div>
                <div className="location-box">
                    <div className="location">{props.weather.name}, {props.weather.sys.country}</div>
                    <div className="time">
                        {prefix0(today.getHours())+ ':' + prefix0(today.getMinutes())}
                    </div>
                    <div className="date">
                        {prefix0(today.getDate())+'-'+prefix0((today.getMonth()+1))+'-'+today.getFullYear()}
                    </div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(temperature)}°C
                    </div>
                    <div className="weather">
                        {weatherDescription}</div>
                </div>
            </div>
        </div>
    );
}

// helpers

function convertZones(weatherData) {
    const localTime = weatherData.dt + weatherData.timezone;
    return new Date(localTime * 1000);
}

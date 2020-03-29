// TODO: make the home screen weather display here
import React from 'react';

// weather home component
export default class WeatherHome extends React.Component {
    render() {
        if(this.props.weather == null){
            return("");
        }
        //const today = new Date();
        const today = convertZones(this.props.weather);
        const temperature = this.props.weather.main.temp;
        const weatherDescription = this.props.weather.weather[0].description;
        return(
            <div>
                <div>
                    <div className="location-box">
                        <div className="location">{this.props.weather.name}, {this.props.weather.sys.country}</div>
                        <div className="time">
                            {getHours(today.getHours())+ ':' + getHours(today.getMinutes())}
                        </div>
                        <div className="date">
                            {today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()}
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
}


function convertZones(weatherData) {
    const localTime = weatherData.dt + weatherData.timezone;
    return new Date(localTime * 1000);
}

function getHours(dateInt) {
    if(dateInt <= 9) {
        return "0" + dateInt;
    }
    return dateInt;
}

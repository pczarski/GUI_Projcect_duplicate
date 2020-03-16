// TODO: make the home screen weather display here
import React from 'react';

// component that renders the home screen weather display
export default class WeatherHome extends React.Component {
    render() {
        const today = new Date();
        if(this.props.weather == null){
            return("");
        }
        return(
            <div>
                {(true) ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{this.props.weather.name}, {this.props.weather.sys.country}</div>
                            <div className="date">{today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(this.props.temp)}°C
                            </div>
                            <div className="weather">
                                {this.props.conditions}</div>
                        </div>
                    </div>
                ) : ("")}
            </div>

        );
    }
}

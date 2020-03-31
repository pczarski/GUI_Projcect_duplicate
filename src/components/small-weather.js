import React from "react";
import "./small-weather.css";
import Cloud from "../assets/cloud.png";
import Sun from "../assets/thsun.png";
import Rain from "../assets/rain.png";
import Moon from "../assets/moon.png";
import NightCloud from "../assets/cloud-night.png";


export default class SmallWeather extends React.Component{

    renderForecastPoint(foreCastPoint){
        if(foreCastPoint.main){
            const temperature = foreCastPoint.main.temp;
            const main = foreCastPoint.weather[0].main;
            const date = new Date((foreCastPoint.dt + this.props.zoneOffset)*1000);
            let src = Sun;
            let alt = "Sun";
            if (main ==="Rain") {
                src = Rain;
                alt = "rain";
            } else if (main === "Clouds" && isNight(foreCastPoint.dt + this.props.zoneOffset, this.props.sunSet, this.props.sunRise)){
                src = NightCloud;
                alt = "cloudy night";
            } else if (main ==="Clouds") {
                src = Cloud;
                alt = "cloud";
            }
            else if (isNight(foreCastPoint, this.props.sunSet, this.props.sunRise)) {
                src = Moon;
                alt = "night"
            }
            return (
                <div className="card--content">
                    <img src={src} alt={alt}/>
                    <h4>
                        {Math.round(temperature)}°C
                    </h4>
                    <h4>
                        {appen0(date.getMonth())}.{appen0(date.getDate())} {appen0(date.getHours())}:{appen0(date.getMinutes())}
                    </h4>
                </div>
            );
        }
        console.log('failed to render a forecast point');
        return("");

    };

    render() {
        const forecasts = this.props.forecast;
        console.log(forecasts);
        const renderForecasts = forecasts.map(point => this.renderForecastPoint(point));
        return (
            <div>
                <section className="card">
                    {renderForecasts}
                </section>
            </div>
        );
    };
}

function isNight(time, sunset, sunrise) {
    const rise = new Date(sunrise * 1000).getHours();
    const set = new Date(sunset * 1000).getHours();
    const now = new Date(time * 1000).getHours();
    return !(rise-1 < now && now < set);
}

function appen0(n) {
    if(n<=9){
        return "0"+n;
    }
    return n;
}

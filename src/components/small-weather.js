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
            const date = foreCastPoint.dt_txt;
            let src = Sun;
            let alt = "Sun";
            if (main ==="Rain") {
                src = Rain;
                alt = "rain";
            } else if (main === "Clouds" && isNight(foreCastPoint, this.props.sunSet, this.props.sunRise)){
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
                        {date.substring(5,16)}
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

function isNight(smallWeather, sunset, sunrise) {
    const rise = new Date(sunrise * 1000).getHours();
    const set = new Date(sunset * 1000).getHours();
    const now = new Date(smallWeather.dt * 1000).getHours();

    console.log("time now: " + smallWeather.dt_txt);
    console.log("is night: " + !(rise < now && now < set));
    console.log(rise +'<'+now+'<'+set);
    // console.log(sunrise);
    // console.log(time);
    // console.log(sunset);

    //return !(smallWeather.dt < sunset && smallWeather.dt > sunrise);
    return !(rise-1 < now && now < set);
}

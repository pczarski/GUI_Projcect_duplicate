import React from "react";
import "./small-weather.css";
import Cloud from "../assets/cloud.png";
import Sun from "../assets/thsun.png";
import Rain from "../assets/rain.png";
import Moon from "../assets/moon.png";
import NightCloud from "../assets/cloud-night.png";
import {prefix0} from "../lib/helpers";

// function component that renders the available forecasts
// requires the list of forecasts, zoneOffset, sunSet, sunRise
export default function SmallWeather(props) {

    // function used to map single forecast onto html element
    const renderForecastPoint = (foreCastPoint) => {
        // only render the point if it exists (there were no errors)
        if(foreCastPoint.main){
            const temperature = foreCastPoint.main.temp;
            const main = foreCastPoint.weather[0].main;
            const date = new Date((foreCastPoint.dt + props.zoneOffset)*1000);

            // select appropriate icon
            let src = Sun;
            let alt = "Sun";
            if (main ==="Rain") {
                src = Rain;
                alt = "rain";
            } else if (main === "Clouds" && isNight(foreCastPoint.dt + props.zoneOffset, props.sunSet, props.sunRise)){
                src = NightCloud;
                alt = "cloudy night";
            } else if (main ==="Clouds") {
                src = Cloud;
                alt = "cloud";
            }
            else if (isNight(foreCastPoint, props.sunSet, props.sunRise)) {
                src = Moon;
                alt = "night"
            }

            return (
                <div className="card-content" key={foreCastPoint.dt}>
                    <img src={src} alt={alt}/>
                    <h4>
                        {Math.round(temperature)}°C
                    </h4>
                    <h4>
                        {prefix0(date.getMonth())}-{prefix0(date.getDate())} {prefix0(date.getHours())}:{prefix0(date.getMinutes())}
                    </h4>
                </div>
            );
        }
        console.log('failed to render a forecast point');
        return("");

    };

    const forecasts = props.forecast;

    // map the forecasts
    const renderForecasts = forecasts.map(point => renderForecastPoint(point));
    return (
        <div>
            <section className="card">
                {renderForecasts}
            </section>
        </div>
    );
}

// helpers:

function isNight(time, sunset, sunrise) {
    const rise = new Date(sunrise * 1000).getHours();
    const set = new Date(sunset * 1000).getHours();
    const now = new Date(time * 1000).getHours();
    return !(rise-1 < now && now < set);
}
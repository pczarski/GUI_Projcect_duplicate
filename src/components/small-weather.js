import React from "react";
import "./small-weather.css";
import Cloud from "../assets/cloud.png";
import Sun from "../assets/thsun.png";

export default class SmallWeather extends React.Component{

    renderForecastPoint(foreCastPoint){
        if(foreCastPoint.main){
            const temperature = foreCastPoint.main.temp;
            const main = foreCastPoint.weather[0].main;
            const date = foreCastPoint.dt_txt;
            let src = Sun;
            let alt = "Sun";
            if (main === "Clouds" || main === "Rain" ){
                src = Cloud;
                alt = "cloud";
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

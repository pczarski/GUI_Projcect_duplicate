import React from "react";
import {generateAdvice} from "../lib/recommend";

// function component that renders the walk recommendation
export default function Advice(props) {
        const weather = props.weather;
        const forecast = props.forecast;
        const timezone = props.zoneOffset;

        // don't render if location not set
        if(weather != null){
            const advice = generateAdvice(
                Math.round(weather.main.temp),
                weather.weather[0].main,
                props.size,
                props.breed,
                forecast,
                timezone,
            );
            return (
                <div className="advice-box">
                    <p>Advice for today:</p>
                    {advice}
                </div>
            );
        }
        return("");
}
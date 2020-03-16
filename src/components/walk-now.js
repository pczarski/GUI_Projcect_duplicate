import React from "react";
import {generateAdvice} from "../lib/recommend";

export default class WalkNow extends React.Component{
    render() {
        const weather = this.props.weather;

        if(weather != null){
            console.log(this.props.size);
            const advice = generateAdvice(
                Math.round(weather.main.temp),
                weather.weather[0].main,
                this.props.size
            );
            return (
                <div className="advice-box">
                    <p>Advice for today:</p>
                    {advice}
                </div>
            );
        }
        return ("");

    }
}
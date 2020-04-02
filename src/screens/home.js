import React, {useEffect} from "react";
import $ from 'jquery';
import WeatherHome from "../components/weather_home";
import '../App.css';
import {Link} from 'react-router-dom';
import Advice from "../components/advice";
import SmallWeather from "../components/small-weather";
import {sampleForecast} from "../assets/sample-weather";
import {api} from '../App';


// home screen
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // only requires forecast since weather is kept by the app
            forecast: sampleForecast.list,
        }
    }

    //fetch the 5 day forecast
    fetchForecast() {
        console.log("fetching forecast!!!");
        const url = api.forecastBase + this.props.location + "&units=metric&APPID=" + api.apikey;
        // example: https://api.openweathermap.org/data/2.5/forecast?q=London&appid=5890b051c398fd53af1e1a449157b1de
        console.log(url);
        $.ajax({
            url: url,
            dataType: "json",
            success: this.updateForecast,
            error: this.noForecast,
        });
    };

    // set forecast to current forecast
    updateForecast = (data) => {
        this.setState({
            forecast: data.list,
        });
    };

    // weather home won't load if we ever get an error here, and it displays appropriate message
    noForecast = (data) => {
        console.log("failed to fetch forecast");
        console.log(data);
    };

    // this functions loads as soon as the component loads
    componentDidMount() {
        this.props.fetchWeather();
        this.fetchForecast();
    };

    render() {
        console.log('rendering home');

        const weatherNow = this.props.weather;
        const theSize = this.props.size;
        const theBreed = this.props.breed;
        const forecast = this.state.forecast;
        const isDark = this.props.isDark;

        return (
            <div className={(weatherNow != null)
                ? ((!isDark) ? 'App Clear' : 'App') : 'App'}>
                <main>
                    <div className="weather-box">

                        <Link to="/config">
                            <button type="button" className={isDark ? 'Button3 Dark' : "Button3"}>
                                Change Breed/Location
                            </button>
                        </Link>

                        <WeatherHome weather = {weatherNow}/>

                        <div className="dog-box">
                            <h5>Dog breed:</h5>
                            <h3>
                                {this.props.breed} <br/>
                            </h3>
                        </div>

                        <SmallWeather
                            onClick={() => this.fetchForecast()}
                            forecast={this.state.forecast}
                            sunSet={weatherNow.sys.sunset + weatherNow.timezone}
                            sunRise={weatherNow.sys.sunrise + weatherNow.timezone}
                            zoneOffset={weatherNow.timezone}
                        />

                        <Advice
                            weather={weatherNow}
                            size={theSize}
                            breed={theBreed}
                            forecast={forecast}
                            zoneOffset={weatherNow.timezone}
                        />

                    </div>
                </main>
            </div>
        );
    }
}
import React from "react";
import $ from 'jquery';
import WeatherHome from "./components/weather_home";
import './App.css';
import Search from "./components/search";
import {Link} from 'react-router-dom';
import WalkNow from "./components/walk-now";
import {sampleWeather} from "./assets/sample-weather";
import SmallWeather from "./components/small-weather";
import {sampleForecast} from "./assets/sample-weather";

const api= {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    forecastBase: "https://api.openweathermap.org/data/2.5/forecast?q=",
};

// temporary variable that prevents api from sending too many requests
// only for debugging purposes
var count = 0;

// main component of the home screen
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        // we only need to store
        this.state = {
            // there is a sampleWeather JSON to load be default to ensure smooth functioning
            // and so that the app shows something even if we fail to load from api
            weather: sampleWeather,
            forecast: sampleForecast.list,
        }
    }

    // queries the open-weather api and updates the components state to the
    // current weather
    fetchWeather() {
        console.log("fetch called!");
        count++;
        if( count < 20) {
            const url = api.base + this.props.location + "&units=metric&APPID=" + api.apikey;
            console.log(url);
            $.ajax({
                url: url,
                dataType: "json",
                success: this.updateWeatherHome,
            })
        }
    };

    // updates component's state to the given weather json
    updateWeatherHome = (data) => {
        console.log(this);
        console.log(this.props.location);
        this.setState({
            weather: data,
        });
    };

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
        });
    };

    updateForecast = (data) => {
        console.log(data.list);
        this.setState({
            forecast: data.list,
        });
    };


    //this functions loads
    // as soon as the component loads, right when it loads, we fetch the weather
    componentDidMount() {
        this.fetchWeather();
        this.fetchForecast();
    };

    // helper function that renders the components that displays the weather
    renderWeatherHome() {
        const temp = this.state.temp;
        const conditions = this.state.conditions;
        const weather = this.state.weather;
        return (
            <WeatherHome
                temp = {temp}
                conditions = {conditions}
                weather = {weather}
            />
        );
    };

    // helper funcions that renders the components that recommends the walk
    renderRecommend() {
        const theWeather = this.state.weather;
        const theSize = this.props.size;
        const theBreed = this.props.breed;
        const forecast = this.state.forecast;
        return(
            <WalkNow
                weather={theWeather}
                size={theSize}
                breed={theBreed}
                forecast={forecast}
            />
            );
    };

    render() {
        console.log('rendering app2 ' + this.props.breed);
        const weatherNow = this.state.weather;
        console.log(this.state);
        this.props.setDark(isDark(weatherNow));
        return (
            <div className={(weatherNow != null)
                ? ((!isDark(weatherNow)) ? 'App Clear' : 'App') : 'App'}>
                <main>
                    <div className="weather-box">
                      
                        <Link to="/config">
                            <button type="button" className={isDark(weatherNow) ? 'Button3 Dark' : "Button3"}>Change Breed/Location</button>
                        </Link>

                        {this.renderWeatherHome()}
                        <div className="dog-box">
                            <h3>
                                Dog breed: <br/>
                                {this.props.breed} <br/>
                            </h3>
                        </div>

                        <SmallWeather
                            onClick={() => this.fetchForecast()}
                            forecast={this.state.forecast}
                            isDark={isDark(weatherNow)}
                        />
                        <div>
                            {this.renderRecommend()}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

function isDark(weatherData) {
    const localTime = weatherData.dt + weatherData.timezone;
    if(!(weatherData.sys.sunrise < weatherData.dt && weatherData.dt < weatherData.sys.sunset)) {
 //   if(!(weatherData.dt > weatherData.sys.sunset)) {
        return true;
    }
    const main = weatherData.weather[0].main;
    if(main === "Rain" || main === "Thunderstorm") {
        return true;
    }
    const code = weatherData.weather[0].id;
    return [602, 616, 621, 622, 804].includes(code);
}
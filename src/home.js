import React from "react";
import $ from 'jquery';
import WeatherHome from "./components/weather_home";
import './App.css';
import Search from "./components/search";
import {Link} from 'react-router-dom';
import WalkNow from "./components/walk-now";
import {sampleWeather} from "./assets/sample-weather";

const api= {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q="
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
        })
    };

    //this functions loads
    // as soon as the component loads, right when it loads, we fetch the weather
    componentDidMount() {
        this.fetchWeather()
    }

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
        const theBreed = this.props.breed
        return(
            <WalkNow
                weather={theWeather}
                size={theSize}
                breed={theBreed}
            />
            );
    };

    render() {
        console.log('rendering app2 ' + this.props.breed);
        const weatherNow = this.state.weather;
        console.log(this.state);
        return (
            <div className={(weatherNow != null)
                ? ((weatherNow.main.temp > 16) ? 'App Clear' : 'App') : 'App'}>
                <main>
                    <div className="weather-box">
                        <Link to="/config">
                            <button type="button" className="btn btn-primary">Configure</button>
                        </Link>

                        {this.renderWeatherHome()}
                        <div className="dog-box">
                            <h3>
                                Dog breed: <br/>
                                {this.props.breed} <br/>
                                Dog size: <br/>
                                {this.props.size}
                            </h3>
                        </div>

                        <div>
                            {this.renderRecommend()}
                        </div>

                        {this.state.location}
                    </div>
                </main>
            </div>
        );
    }

}
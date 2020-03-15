import React from "react";
import $ from 'jquery';
import WeatherHome from "./components/weather_home";
import './App.css';
import Search from "./components/search";

const api= {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

var count = 0;


export default class App2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: "London", // by default the location is London
            breed: null, // by default breed and size is not selected
            size: null,
            temp: null,
            conditions: "Cloudy",
            weather: null,
        }
    }


    fetchWeather() {
        console.log("fetch called!");
        count++;
        if( count < 20) {
            const url = api.base + this.state.location + "&units=metric&APPID=" + api.apikey;
            console.log(url);
            $.ajax({
                url: url,
                dataType: "json",
                success: this.updateWeatherHome,
            })
        }
    };

    updateWeatherHome = (data) => {
        console.log(this);
        console.log(this.state.location);
        this.setState({
            temp: data['main']['temp'],
            conditions: data['weather']['0']['description'],
            weather: data,
        })
    };

    changeLocation = (newLocation) => {
        console.log("calling new location" + newLocation);
        this.setState({
            location: newLocation
        });
        this.fetchWeather();
    };

    componentDidMount() {
        this.fetchWeather()
    }

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

    renderSearch() {

        return (
            <Search
                onSubmit={this.changeLocation}
            />

        );
    }

    render() {
        console.log('rendering app2');
        console.log(this.state.weather);
        console.log(this.state);
        return (
            <div>
                {this.renderSearch()}
                {this.renderWeatherHome()}
                {this.state.location}
            </div>
        );
    }

}
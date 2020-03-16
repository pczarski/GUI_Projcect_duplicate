import React from "react";
import $ from 'jquery';
import WeatherHome from "./components/weather_home";
import './App.css';
import Search from "./components/search";
import {Link} from 'react-router-dom';

const api= {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

var count = 0;


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          //  location: "London", // by default the location is London
            //   breed: null, // by default breed and size is not selected
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
            const url = api.base + this.props.location + "&units=metric&APPID=" + api.apikey;
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
        console.log(this.props.location);
        this.setState({
            temp: data['main']['temp'],
            conditions: data['weather']['0']['description'],
            weather: data,
        })
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

    render() {
        console.log('rendering app2 ' + this.props.breed);
        console.log(this.state.weather);
        console.log(this.state);
        return (
            <main>
                <div>
                    <Link to="/config">
                        <button type="button" className="btn btn-primary">Configure</button>
                    </Link>

                    {this.renderWeatherHome()}
                    {this.state.location}
                </div>
            </main>
        );
    }

}
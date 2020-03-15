import React, { useState } from 'react';
import './App.css';
<<<<<<< Updated upstream
=======
import { render } from '@testing-library/react';
import $ from 'jquery'

var today = new Date();
var time = today.getHours() + ":" + "00";
var breed = 'Golden Retreiver';
var Window = "Weather";
var location = "London";
>>>>>>> Stashed changes

const api= {
    apikey: "928d3716bf756a2b7ce8b6b6a49dfe38",
    base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.apikey}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };


    // returns current date
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    };

    // if search is undefined = App, if search > 16 degrees = clearsky background
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App Clear' : 'App') : 'App'}>
            <main>
                <div className="search-box">
                    <input
                        type ="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ("")}
            </main>
        </div>
    );
}

export default App;

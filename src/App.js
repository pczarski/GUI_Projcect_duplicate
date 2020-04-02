import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./screens/home";
import Config from "./screens/config";
import {sampleWeather} from "./assets/sample-weather";
import $ from "jquery";

export const api = {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    forecastBase: "https://api.openweathermap.org/data/2.5/forecast?q=",
};

// we use a function components instead of class component in order to use hooks, which minimizes the code size by avoiding
// creating "set" functions for every parameter that requires it
export default function App()  {

    // the App keeps the states that need to be passed between screens:
    const [breed, setBreed] = useState("Golden Retriever");
    const [location, setLocation] = useState("London");
    const [size, setSize] = useState("Large");
    const [dark, setDark] = useState(true);
    const [weather, setWeather] = useState(sampleWeather);

    console.log(breed);

    const fetchWeather = () => {
        console.log("fetching weather!");
        const url = api.base + location + "&units=metric&APPID=" + api.apikey;
        console.log(url);
        $.ajax({
            url: url,
            dataType: "json",
            success: updateWeather,
            error: locationNotFound,
        });
    };

    const updateWeather = (data) => {
        setWeather(data);
        setDark(isDark(data))
    };

    // in case unexpected error occurs.
    const locationNotFound = (error) => {
        console.log(error.responseText);
        const response = JSON.parse(error.responseText);
        if(response.cod === "404") {
            setLocation("Location not found or not supported");
        }
        else {
            setLocation("Unexpected error occurred. Try to open the app again, if the problem persist please report the issue.");
        }
    };

    // define the screens
    // using render={(props) => <ComponentName {...props} prop1={aValue}/> allows passing props
    return(
        <Router>
            <div className={(dark) ? "App" : "App Clear"}>
                <Switch>

                    <Route
                        path="/" exact
                        render={(props) =>
                            <Home
                            {...props} breed={breed}
                            location={location}
                            size={size}
                            setDark={setDark}
                            changeLocation = {setLocation}
                            updateWeather = {setWeather}
                            fetchWeather = {fetchWeather}
                            weather = {weather}
                            isDark = {dark}
                            />
                        }
                    />

                    <Route
                        path="/config"
                        render={(props) =>
                            <Config
                            {...props}
                            isDark = {dark}

                            //for select
                            changeBreed = {setBreed}
                            changeSize = {setSize}

                            //for save
                            changeLocation = {setLocation}
                        />}
                    />

                </Switch>

            </div>
        </Router>
    );
}

//helpers:

// checks whether the app should be in dark mode
function isDark(weatherData) {
    if(!(weatherData.sys.sunrise < weatherData.dt && weatherData.dt < weatherData.sys.sunset)) {
        return true;
    }
    const main = weatherData.weather[0].main;
    if(main === "Rain" || main === "Thunderstorm") {
        return true;
    }
    const code = weatherData.weather[0].id;
    return [602, 616, 621, 622, 804].includes(code);
}
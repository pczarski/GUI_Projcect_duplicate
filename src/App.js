import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./home";
import Config from "./config";
import {sampleWeather} from "./assets/sample-weather";
import $ from "jquery";

export const api= {
    apikey: "5890b051c398fd53af1e1a449157b1de",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    forecastBase: "https://api.openweathermap.org/data/2.5/forecast?q=",
};

export default function App()  {

    // define hooks, for easy state management
    // the App keeps the states that need to be passed between screens
    const [breed, setBreed] = useState("Golden Retriever");
    const [location, setLocation] = useState("London");
    const [size, setSize] = useState("Large");
    const [dark, setDark] = useState(true);
    const [weather, setWeather] = useState(sampleWeather);

    // states for search component
    const [hasError, setHasError] = useState(false);
    const [message, setMessage] = useState("");

    console.log(breed);

    const fetchWeather = () => {
        console.log("fetching weather!");
        const url = api.base + location + "&units=metric&APPID=" + api.apikey;
        console.log(url);
        $.ajax({
            url: url,
            dataType: "json",
            success: changeWeather,
            error: locationNotFound,
        });
    };

    const changeWeather = (data) => {
        setWeather(data);
        setHasError(false);
        setMessage("Saved!");
    };

    // in case unexpected error occurs.
    const locationNotFound = (error) => {
        console.log(error.responseText);
        const response = JSON.parse(error.responseText);
        if(response.cod === "404") {
            setLocation("Location not found or not supported");
            setHasError(true);
        }
        else {
            setLocation("Unexpected error occurred. Try to open the app again, if the problem persist please report the issue.");
            setHasError(true);
        }
    };

    // define the screens
    // using render={(props) => <ComponentName {...props} prop1={aValue}/> allows to pass props so that you can share states
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
                            // hasError = {hasError}
                            // setHasError = {setHasError}
                            // message = {message}
                            // setMessage = {setMessage}
                            // fetchWeather = {fetchWeather}
                        />}
                    />

                </Switch>

            </div>
        </Router>
    );

}
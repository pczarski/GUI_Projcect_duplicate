import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./home";
import Config from "./config";
import {sampleWeather} from "./assets/sample-weather";

export default function App()  {

    // define hooks, for easy state management
    // the App keeps the states that need to be passed between screens
    const [breed, setBreed] = useState("Golden Retriever");
    const [location, setLocation] = useState("London");
    const [size, setSize] = useState("Large");
    const [dark, setDark] = useState(true);
    const [weather, setWeather] = useState(sampleWeather);
    console.log(breed);

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
                            />}
                    />

                    <Route
                        path="/config"
                        render={(props) =>
                            <Config
                            {...props} changeBreed = {setBreed}
                            changeLocation = {setLocation}
                            changeSize = {setSize}
                            isDark = {dark}
                            location = {location}
                        />}
                    />

                </Switch>

            </div>
        </Router>
    );

}
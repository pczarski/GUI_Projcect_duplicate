import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./home";
import Config from "./config";

export default function App()  {

    // define hooks, for easy state management
    // the App keeps the states that need to be passed between screens
    const [breed, setBreed] = useState("Bulldog");
    const [location, setLocation] = useState("London");
    const [size, setSize] = useState("Large");
    console.log(breed);

    // define the screens
    // using render={(props) => <ComponentName {...props} prop1={aValue}/> allows to pass props so that you can share states
    return(
        <Router>
            <div className="App">
                <Switch>

                    <Route
                        path="/" exact
                        render={(props) =>
                            <Home
                            {...props} breed={breed}
                            location={location}
                            size={size}
                            />}
                    />

                    <Route
                        path="/config"
                        render={(props) =>
                            <Config
                            {...props} changeBreed = {setBreed}
                            changeLocation = {setLocation}
                            changeSize = {setSize}
                        />}
                    />

                </Switch>

            </div>
        </Router>
    );

}
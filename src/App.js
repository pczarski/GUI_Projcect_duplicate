import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./home";
import Config from "./config";

export default function App()  {

    const [breed, setBreed] = useState("Bulldog");
    const [location, setLocation] = useState("London")
    console.log(breed);
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
                            />}
                    />

                    <Route
                        path="/config"
                        render={(props) =>
                            <Config
                            {...props} changeBreed = {setBreed}
                            changeLocation = {setLocation}
                        />}
                    />

                </Switch>

            </div>
        </Router>
    );

}
import React, { useState } from 'react';
import './App.css';
import { render } from '@testing-library/react';

var today = new Date();
var time = today.getHours() + ":" + "00";
var breed = 'Golden Retreiver';
var Window = "Weather";
var location = "London";
var Size = "Large";

const api= {
    apikey: "d18728d560ba81dbe5edf3ca12e559f5",
    base: "https://api.openweathermap.org/data/2.5/"
};


function App() {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [initial, setInitial] = useState("True");
    

    if (initial === "True"){
        setInitial("False")
        fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.apikey}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
    }

    const search = evt => {
        if (evt.key === "Enter") {
            location = query;
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.apikey}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    const Select = evt => {
        var e = document.getElementById("dropdown");
        breed = e.options[e.selectedIndex].text;
        Size = e.options[e.selectedIndex].value;
    };

    const ChangeBreed = evt =>{
        if(Window === "Weather"){
            Window = "DogBreed";
        }else{
            Window = "Weather";
        }
        fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.apikey}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        

    };




    if(Window === "Weather"){
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
                            <div className="date">{today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                    
                ) : ("")}

                    
                <div>
                <div className="weather-box">
                        <div className="dog-box">
                            Your Breed: {breed}
                        </div>
                        <div>
                        <button type="button" onClick={ChangeBreed} className="Button">Change Breed</button>
                        </div>
                    </div>
                </div>
                        
                    
            </main>
        </div>
    );
    }else{
        return(
            
            <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App Clear' : 'App') : 'App'}>
            <main>
            <div>
            <div className="title"> Your Selected Breed: </div>
                <div className="weather-box">
                        <div className="dog-box">
                        <div >
                            <label >Select your breed: </label>
                            <select  onChange={Select} id="dropdown" className="Select" >
                                <option value="Large">Golden Retriver</option>
                                <option value="Large">German Sheapord</option>
                                <option value="Small">Pug</option>
                                <option value="Medium">Beagle</option>
                                <option value="Small">Pomeranian</option>
                            </select>
                        </div>
                        </div>
                        <div>
                    </div>
                </div>
                <div className="invisBox"><button type="button" onClick={ChangeBreed} className="Button">Go Back</button></div>
                <div ></div>
            </div>
            </main>
            </div>
        );
    }
}

export default App;

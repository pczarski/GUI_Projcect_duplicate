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

function generateAdvice(degrees,desc,dSize) {
    if (dSize == "Large"){
        if (desc == "Atmosphere" ){
            return " Please review your environment before taking your dog on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 40 minutes." 
        }else if (desc == "Clear" ) {
            if (degrees < -10 ){
                return " The skies are clear but it is extremely cold. Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 35 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The skies are clear but it is very cold. Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 50 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The skies are clear and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The skies are clear and its nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 2 hours."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The skies are clear and it is very hot. Today can get very hot so ensure that you and your dog stay well hydrated.The recommended duration for the walk is 40 minutes."
            }else if( degrees < 40 ) {
                return "The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your dogs feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc == "Clouds" ) {
            if (degrees < -10 ){
                return "The day appears cloudy and extremely cold.Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 30 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The day appears cloudy and very cold.Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 50 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day appears cloudy and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 2 hours."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day appears cloudy but can get very warm. Please stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }
        }else if (desc == "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return " The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 50 minutes."
            }
        }else if (desc == "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 50 minutes."
            }
        }else if (desc == "Snow" ) {
            if (degrees <= -10 ){
                return "It is freezing and snowing today. Only take your dog out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 30 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "It is very cold and snowing today. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "It is cold and very likely to snow. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 40 minutes."
            }
        }else if (desc == "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 20 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 40 minutes."
            }
        }


    } else if (dSize == "Medium") {

        if (desc == "Atmosphere" ){
            return " Please review your environment before taking your dog on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 40 minutes." 
        }else if (desc == "Clear" ) {
            if (degrees < -10 ){
                return " The skies are clear but it is extremely cold. Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 25 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The skies are clear but it is very cold. Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The skies are clear and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 20 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The skies are clear and its nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 1 hour 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The skies are clear and it is very hot. Today can get very hot so ensure that you and your dog stay well hydrated.The recommended duration for the walk is 40 minutes."
            }else if( degrees < 40 ) {
                return "The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your dogs feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc == "Clouds" ) {
            if (degrees < -10 ){
                return "The day appears cloudy and extremely cold.Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 25 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The day appears cloudy and very cold.Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day appears cloudy and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 20 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 1 hour 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day appears cloudy but can get very warm. Today can get very hot so ensure that you and your dog stay well hydrated.The recommended duration for the walk is 40 minutes."
            }
        }else if (desc == "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return " The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }
        }else if (desc == "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }
        }else if (desc == "Snow" ) {
            if (degrees <= -10 ){
                return "It is freezing and snowing today. Only take your dog out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 35 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "It is very cold and snowing today. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 35 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "It is cold and very likely to snow. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 45 minutes."
            }
        }else if (desc == "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }
        }



    }else if (dSize == "Small") {

        if (desc == "Atmosphere" ){
            return " Please review your environment before taking your dog on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 25 minutes." 
        }else if (desc == "Clear" ) {
            if (degrees < -10 ){
                return " The skies are clear but it is extremely cold. Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 15 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The skies are clear but it is very cold. Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The skies are clear and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The skies are clear and its nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The skies are clear and it is very hot. Today can get very hot so ensure that you and your dog stay well hydrated.The recommended duration for the walk is 1 hour."
            }else if( degrees < 40 ) {
                return "The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your dogs feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc == "Clouds" ) {
            if (degrees < -10 ){
                return "The day appears cloudy and extremely cold.Please ensure that your dog is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 15 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "The day appears cloudy and very cold.Please ensure that you and your dog are outfitted with warm clothing before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your dog is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day appears cloudy and fairly warm. It's a perfect day to head outside with your dog. The recommended duration for the walk is up to 1 hour and 15 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your dog.The recommended duration for the walk is up to 1 hour."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day appears cloudy but can get very warm. Please stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }
        }else if (desc == "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return " The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 35 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 35 minutes."
            }
        }else if (desc == "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 20 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 30 minutes."
            }
        }else if (desc == "Snow" ) {
            if (degrees <= -10 ){
                return "It is freezing and snowing today. Only take your dog out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 15 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return "It is very cold and snowing today. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return "It is cold and very likely to snow. Please make sure you and your dog are dressed warm and comfortable before going out.The recommended duration for the walk is 20 minutes."
            }
        }else if (desc == "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return "The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 10 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return "The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 10 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return "The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 15 minutes."
            }
        }
    }

}

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
                            <p>Your Breed: {breed} </p>
                        </div>
                        <div>
                        <button type="button" onClick={ChangeBreed} className="Button">Change Breed</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="advice-box">
                        <p>Advice for today:</p>
                        {(typeof weather.main != "undefined") ? (
                            //generateAdvice(temp,desc,size)
                            //Math.round(weather.main.temp)+" "+ weather.weather[0].main + " " + Size
                            generateAdvice(Math.round(weather.main.temp),weather.weather[0].main,Size)
                        ) : ("")}
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
                                <option value="Large">Golden Retriever</option>
                                <option value="Large">German Shepherd</option>
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

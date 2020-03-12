import React from 'react';
// import jquery for API calls
import $ from 'jquery'; //TODO: need to install Jquery

function WeatherHome() {
    // API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
    const url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=d18728d560ba81dbe5edf3ca12e559f5";
    // $.ajax({
    //     url: url,
    //     dataType: "jsonp",
    //     success : this.parseResponse,
    //     error : function(req, err){ console.log('API call failed ' + err); }
    // });

    // const parseResponse = (parsed_json) => {
    //     var location = parsed_json['name'];
    //     var temp_c = parsed_json['main']['temp'];
    //     var conditions = parsed_json['weather']['0']['description'];
   // }
    // const weather =
}
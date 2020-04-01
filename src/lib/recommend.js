//parses the forecast data and returns only today's forecast with only the info needed to generate the advice
function getForecastInfo(forecasts, timezone) {
    let todayForecast = [];
    let today = new Date().getDate();

    for(let i = 0; i < forecasts.length; i++) {
        const day = parseInt(forecasts[i].dt_txt.substring(8,10));
        if(day != today){
            return todayForecast;
        }
        const date = new Date((forecasts[i].dt + timezone) * 1000);
        todayForecast.push({
            "time": prefix0(date.getHours())+":"+prefix0(date.getMinutes()),
            "id":forecasts[i].weather[0].id,
            "main":forecasts[i].weather[0].main,
            "description":forecasts[i].weather[0].description,
            "icon": forecasts[i].weather[0].icon,
        });
    }
    return todayForecast;
}

// generates the advice based on the forecast
export function generateAdvice(degrees, desc, dSize, breed, forecast, timezone) {

    // use forecast info the generate advice for walk time and place
    const forecastInfo = getForecastInfo(forecast, timezone);
    // console.log(forecastInfo);
  
    let msg="";
    let walkieTimes = [];
    for( let i=0; i < forecastInfo.length;i++)
    {
        if(forecastInfo[i].id >=800 && forecastInfo[i].id <900)
        {
            walkieTimes.push(forecastInfo[i].time);
        }
    }

    if(walkieTimes.length === 0 && forecastInfo.length !== 0){
        if(forecastInfo[0].id >=200 && forecastInfo[0].id < 600)
        {
            msg += "It is going to be raining the entire day. Please avoid grassy and muddy areas. "
        }
        else if(forecastInfo[0].id >=600 && forecastInfo[0].id <700)
        {
            msg += "It is going to be snowing the entire day. Please be cautious around ice so you dont slip and hurt yourself. "
        }
    }
    else if(walkieTimes.length === 1){
        msg += "The best time to go for a walk today is "+ walkieTimes[0] + ". ";
    }
    else if(walkieTimes.length === forecastInfo.length){
        msg += "Todays weather will be nice enough to go for a walk at any time. ";        
    }
    else {
        let times = " ";
        for( let x=0; x<walkieTimes.length;x++){
            if(x===(walkieTimes.length-1)){
                times += walkieTimes[x] + ". "
            }
            else if(x===(walkieTimes.length-2)){
                times += walkieTimes[x] + " and "
            }
            else if(x===(walkieTimes.length-2)){
                times += walkieTimes[x] + " , "
            }
        }
        msg += "The weather should be good enough for a walk at" + times;
            
    }

    if (dSize === "Large"){
        if (desc === "Atmosphere" ){
            return msg +" Please review your environment before taking your " + breed +" on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 40 minutes."
        }else if (desc === "Clear" ) {
            if (degrees < -10 ){
                return msg +" The skies are clear but it is extremely cold. Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 35 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"The skies are clear but it is very cold. Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 50 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The skies are clear and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The skies are clear and its nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 2 hours."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The skies are clear and it is very hot. Today can get very hot so ensure that you and your " + breed +" stay well hydrated.The recommended duration for the walk is 40 minutes."
            }else if( degrees < 40 ) {
                return msg +"The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your " + breed +"'s feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc === "Clouds" ) {
            if (degrees < -10 ){
                return msg +"The day appears cloudy and extremely cold. Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 30 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"The day appears cloudy and very cold. Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 50 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day appears cloudy and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 2 hours."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day appears cloudy but can get very warm. Please stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }
        }else if (desc === "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +" The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 50 minutes."
            }
        }else if (desc === "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 50 minutes."
            }
        }else if (desc === "Snow" ) {
            if (degrees <= -10 ){
                return msg +"It is freezing and snowing today. Only take your " + breed +" out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 30 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"It is very cold and snowing today. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"It is cold and very likely to snow. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 40 minutes."
            }
        }else if (desc === "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 20 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 40 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 40 minutes."
            }
        }


    } else if (dSize === "Medium") {

        if (desc === "Atmosphere" ){
            return " Please review your environment before taking your " + breed +" on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 40 minutes."
        }else if (desc === "Clear" ) {
            if (degrees < -10 ){
                return msg +" The skies are clear but it is extremely cold. Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 25 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"The skies are clear but it is very cold. Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The skies are clear and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 20 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The skies are clear and its nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 1 hour 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The skies are clear and it is very hot. Today can get very hot so ensure that you and your " + breed +" stay well hydrated.The recommended duration for the walk is 40 minutes."
            }else if( degrees < 40 ) {
                return msg +"The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your " + breed +"s feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc === "Clouds" ) {
            if (degrees < -10 ){
                return msg +"The day appears cloudy and extremely cold.Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 25 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"The day appears cloudy and very cold.Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day appears cloudy and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 20 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 1 hour 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day appears cloudy but can get very warm. Today can get very hot so ensure that you and your " + breed +" stay well hydrated.The recommended duration for the walk is 40 minutes."
            }
        }else if (desc === "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +" The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 60 minutes."
            }
        }else if (desc === "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 45 minutes."
            }
        }else if (desc === "Snow" ) {
            if (degrees <= -10 ){
                return msg +"It is freezing and snowing today. Only take your " + breed +" out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 35 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"It is very cold and snowing today. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 35 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"It is cold and very likely to snow. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 45 minutes."
            }
        }else if (desc === "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 30 minutes."
            }
        }



    }else if (dSize === "Small") {

        if (desc === "Atmosphere" ){
            return msg +" Please review your environment before taking your " + breed +" on a walk. The atmosphere can be decieving and so personal judgement is needed. The max recommended duration for the walk is 25 minutes."
        }else if (desc === "Clear" ) {
            if (degrees < -10 ){
                return msg +" The skies are clear but it is extremely cold. Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 15 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg + "The skies are clear but it is very cold. Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The skies are clear but it is cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The skies are clear and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The skies are clear and its nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 1 hour and 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The skies are clear and it is very hot. Today can get very hot so ensure that you and your " + breed +" stay well hydrated.The recommended duration for the walk is 1 hour."
            }else if( degrees < 40 ) {
                return msg +"The skies are clear but it is extremely hot. Please avoid any dark matte areas to protect your " + breed +"s feet from burning, stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }

        }else if (desc === "Clouds" ) {
            if (degrees < -10 ){
                return msg +"The day appears cloudy and extremely cold.Please ensure that your " + breed +" is covered perfectly to be able to keep warm in this environment. The recommended duration for the walk is 15 minutes though not advisable."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"The day appears cloudy and very cold.Please ensure that you and your " + breed +" are outfitted with warm clothing before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"The day appears cloudy and  cold. Please ensure you are dressed appropriately and head home when you think your " + breed +" is cold. The recommended duration for the walk is 40 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day appears cloudy and fairly warm. It's a perfect day to head outside with your " + breed +". The recommended duration for the walk is up to 1 hour and 15 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day appears cloudy but nice and warm. Its a perfect day to head outside and play with your " + breed +".The recommended duration for the walk is up to 1 hour."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day appears cloudy but can get very warm. Please stay well hydrated and keep exercise to a minimum.The recommended duration for the walk is no more than 20 minutes."
            }
        }else if (desc === "Drizzle" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +" The day should bring a bit of a cold drizzle. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"The day should bring a bit of a drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day should bring a bit of a warm drizzle. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 35 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day should bring a bit of a steamy drizzle. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 35 minutes."
            }
        }else if (desc === "Rain" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"It is cold and raining outside. Please ensure you are dressed warm and take an umbrella with you. The recommended duration for the walk is 20 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg +"It is raining outside. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 25 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"It is a warm and rainy day today. Please wear a raincoat or take an umbrella with you. The recommended duration for the walk is 30 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"It is very warm and rainy today. Please ensure you are dressed appropriately and take an umbrella with you. The recommended duration for the walk is 30 minutes."
            }
        }else if (desc === "Snow" ) {
            if (degrees <= -10 ){
                return msg +"It is freezing and snowing today. Only take your " + breed +" out if it is necessary and make sure you are both dressed really warm.The recommended duration for the walk is 15 minutes."
            }else if( degrees > -10 && degrees <= 0 ) {
                return msg +"It is very cold and snowing today. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 0 && degrees <= 10 ) {
                return msg +"It is cold and very likely to snow. Please make sure you and your " + breed +" are dressed warm and comfortable before going out.The recommended duration for the walk is 20 minutes."
            }
        }else if (desc === "Thunderstorm" ) {
            if( degrees >= 0 && degrees <= 10 ) {
                return msg +"The day is likely to be filled with cold,heavy rain and lightning. Going out in this weather is strongly not recommended but if it is necessary then please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 10 minutes."
            }else if( degrees > 10 && degrees <= 20 ) {
                return msg + "The day is likely to be filled with heavy rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed appropriately if need be.The recommended duration for the walk is 10 minutes."
            }else if( degrees > 20 && degrees <= 30 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 15 minutes."
            }else if( degrees > 30 && degrees <= 40 ) {
                return msg +"The day is likely to be warm but filled with rain and lightning. Going out in this weather is strongly not recommended. Please ensure you are dressed warm and in something waterproof.The recommended duration for the walk is 15 minutes."
            }
        }
    }
}

// helpers:

// not importing from helpers.js since libs shouldn't be coupled
function prefix0(dateInt) {
    if(dateInt <= 9) {
        return "0" + dateInt;
    }
    return dateInt;
}

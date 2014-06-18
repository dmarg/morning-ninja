'use strict';

exports.getWeatherMessage = function(wData, name) {

  function greeting(fName) {
    var gWord = ['Ahoy', "G'day", 'Hi', 'Howdy', 'Yo', 'Sup', 'Allo Allo', "Mornin'", 'Hola', 'Hello', 'Shalom', "You say goodbye... I say hello...", 'Bonjour', 'Greetings', 'Buenos dias'];

    var num = Math.floor(Math.random() * gWord.length);

    return gWord[num] + ' ' + fName;
  }

  function skies(cloud) {
    if (cloud === 0 || (cloud > 0 && cloud < 0.2)) {
      return 'clear skies';
    } else if (cloud >= 0.2 && cloud < 0.55) {
      return 'scattered clouds';
    } else if (cloud >= 0.55 && cloud < 0.75) {
      return 'broken cloud cover';
    } else if (cloud >= 0.75) {
      return 'overcast skies';
    } else {
      return 'cloudy';
    }
  }

  function precipIntens(precipIn) {
    if (precipIn > 0 && precipIn < 0.012) {
      return 'very light ';
    } else if (precipIn >= 0.012 && precipIn < 0.08) {
      return 'light ';
    } else if (precipIn >= 0.08 && precipIn < 0.38) {
      return 'moderate ';
    } else if (precipIn >= 0.38) {
      return 'heavy ';
    } else {
      return '';
    }
  }

  function precipProb(precipPr, precipInt, precipTy) {
    var intensity = precipIntens(precipInt);

    if(!precipTy || precipPr === 0) {
      return 'no precipitation';
    } else if(precipPr > 0 && precipPr < 0.25) {
      return 'a slight chance of ' + intensity + precipTy;
    } else if(precipPr >= 0.25 && precipPr < 0.5) {
      return 'a decent chance of ' + intensity + precipTy;
    } else if(precipPr >= 0.5 && precipPr < 0.8) {
      return 'a good chance of ' + intensity + precipTy;
    } else if(precipPr >= 0.8) {
      return intensity + precipTy;
    } else {
      return 'no precipitation';
    }
  }

  var userName = name.charAt(0).toUpperCase() + name.slice(1);

  // Daily Summary from forecast.io
  var dailySummary = wData.weatherData.daily.data[0].summary || undefined;

  // Daily Temps and Humidity
  var maxTemp = Math.ceil(wData.weatherData.daily.data[0].temperatureMax) || undefined;
  var minTemp = Math.floor(wData.weatherData.daily.data[0].temperatureMin) || undefined;
  var humidity = wData.weatherData.daily.data[0].humidity || undefined;

  // Daily Precipitation variables
  var precipProbability = wData.weatherData.daily.data[0].precipProbability || undefined;
  var precipType = wData.weatherData.daily.data[0].precipType || undefined;
  var precipIntensity = wData.weatherData.daily.data[0].precipIntensity || undefined;

  // Daily Cloud Cover
  var cloudCover = wData.weatherData.daily.data[0].cloudCover || undefined;

  /*****
  // ADD CLOTHES TYPE FOR FUNNINESS LATER
  *****/

  var message = "${greeting}! Today's forecast is ${sky} with ${precipitation}. The temperature range will be H:${mTemp}/L:${lTemp}.";

  message = message.replace("${greeting}", greeting(userName));
  message = message.replace("${sky}", skies(cloudCover));
  message = message.replace("${precipitation}", precipProb(precipProbability, precipIntensity, precipType));
  message = message.replace("${mTemp}", maxTemp);
  message = message.replace("${lTemp}", minTemp);

  // console.log('generated message: ', message);

  // Returns simple message
  // return dailySummary + ' Daily Temps: H:' + maxTemp + ' / L:' + minTemp + '.';
  return message;
};
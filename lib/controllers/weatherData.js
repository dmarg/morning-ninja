'use strict';
var config = require('../config/config');
var request = require('request');
var moment = require('moment');
var schedule = require('node-schedule');
var wMessage = require('../weatherMessageGenerator');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    Weather = mongoose.model('Weather');

var weatherApiKey = config.apiKeys.weatherApiKey;
//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME

// Interval to Obtain Daily Weather Data
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 21;
rule.minute = 37;

// Call every minute
// rule.minute = [0, new schedule.Range(0, 60, 1)];


var dailyWeatherData = function() {

  var today = moment().format("YYYY-MM-DD");

  var date = new Date();
  var currentHour = date.getUTCHours();
  var currentMin = date.getUTCMinutes();
  var currentTime = currentHour + ':' + currentMin + ':00';

  Weather.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Weather DB dropped at ' + currentTime);
    }
  });

  Geocode.find({}, function(err, zips) {
    zips.forEach(function(zip) {
      var lat = zip.latitude;
      var lng = zip.longitude;
      var zipcode = zip.zipcode;

      // console.log('lat: ', lat, ' lng: ', lng);

      var locToFetch = 'https://api.forecast.io/forecast/' + weatherApiKey + '/' + lat + ',' + lng + ',' + today + 'T12:00:00Z';

      request(locToFetch, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body); // display all weather data to the console.

          // var message = wMessage.getWeatherMessage(JSON.parse(body));
          // console.log(message);

          var dailyWeather = new Weather({
            zipcode: zipcode,
            latitude: lat,
            longitude: lng,
            day: today,
            weatherData: JSON.parse(body)
          });

          dailyWeather.save(function(err) {
            if (err) {console.log(err);}
          });

        }
      });

    });
  });
};

// Call function to schedule job
var getWeather = schedule.scheduleJob(rule, dailyWeatherData);







// Front page easter egg.
exports.getWeatherData = function(req, res) {

  var lat = req.body.latitude;
  var lng = req.body.longitude;
  var zipcode = req.body.zipcode;
  var name = req.body.fname;

  var today = moment().format("YYYY-MM-DD");

  var locToFetch = 'https://api.forecast.io/forecast/' + weatherApiKey + '/' + lat + ',' + lng + ',' + today + 'T12:00:00Z';

  // console.log('today: ', today);

  Weather.findOne({zipcode: zipcode}, function(err, data) {
    if (data) {
      res.send(data);
    } else {
      request(locToFetch, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body); // display all weather data to the console.

          // var message = wMessage.getWeatherMessage(JSON.parse(body));
          // console.log(message);

          var dailyWeather = new Weather({
            zipcode: zipcode,
            latitude: lat,
            longitude: lng,
            day: today,
            weatherData: JSON.parse(body)
          });

          dailyWeather.save(function(err) {
            if (err) {console.log(err);}
          });

          res.send(dailyWeather);

        }
      });
    }

  });

};
'use strict';
var request = require('request');
var moment = require('moment');
var schedule = require('node-schedule');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    Weather = mongoose.model('Weather');

var weatherApiKey = '8525525fc41b4da95241c76df53a8577';
//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME

// Interval to Obtain Daily Weather Data
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 4;
rule.minute = 25;

exports.getWeatherData = function(req, res) {

  var lat = req.body.latitude;
  var lng = req.body.longitude;

  var today = moment().format("YYYY-MM-DD");

  console.log('today: ', today);


  var locToFetch = 'https://api.forecast.io/forecast/' + weatherApiKey + '/' + lat + ',' + lng + ',' + today + 'T12:00:00';

  request(locToFetch, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // display all weather data to the console.
      res.send(body);
    }
  });
};

var dailyWeatherData = function() {

  var today = moment().format("YYYY-MM-DD");

  Weather.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Weather DB dropped.');
    }
  });

  Geocode.find({}, function(err, zips) {
    zips.forEach(function(zip) {
      var lat = zip.latitude;
      var lng = zip.longitude;
      var zipcode = zip.zipcode;

      // console.log('lat: ', lat, ' lng: ', lng);

      var locToFetch = 'https://api.forecast.io/forecast/' + weatherApiKey + '/' + lat + ',' + lng + ',' + today + 'T12:00:00';

      request(locToFetch, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body); // display all weather data to the console.

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

var getWeather = schedule.scheduleJob(rule, dailyWeatherData);
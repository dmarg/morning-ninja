'use strict';
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode');

//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE

exports.getWeatherData = function(req, res) {

  var lat = req.body.latitude;
  var lng = req.body.longitude;
  var apiKey = '8525525fc41b4da95241c76df53a8577';

  var today = moment().format("YYYY-MM-DD");

  console.log('today: ', today);


  var locToFetch = 'https://api.forecast.io/forecast/' + apiKey + '/' + lat + ',' + lng + ',' + today + 'T12:00:00';

  request(locToFetch, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // display all weather data to the console.
      res.send(body);
    }
  });
};
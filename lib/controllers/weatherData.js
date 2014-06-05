'use strict';
var request = require('request');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode');

//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE

exports.getWeatherData = function(req, res) {

  var lat = req.body.latitude;
  var lng = req.body.longitude;
  var apiKey = '8525525fc41b4da95241c76df53a8577';

  var locToFetch = 'https://api.forecast.io/forecast/' + apiKey + '/' + lat + ',' + lng;

  request(locToFetch, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // Print the google web page.
      res.send(body);
    }
  });
};
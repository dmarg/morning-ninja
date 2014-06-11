'use strict';
// var client = require('twilio')(accountSid, authToken);
var config = require('../config/config');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    Weather = mongoose.model('Weather');


var accountSid = config.apiKeys.twilioAccountSid;
var authToken = config.apiKeys.twilioAuthToken;

exports.sendSMS = function(req, res) {

  var weatherSummary = req.body.weather;
  var cellPhone = req.body.cellPhone;

  console.log(weatherSummary);


  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "+1" + cellPhone,
    from: "+16465254514",
    body: "Morning Ninja Weather: " + weatherSummary
  }, function(err, message) {
    console.log(message.sid);
    res.send(message);
  });

};

exports.sendWeatherSMS = function(name, cellPhone, message) {

  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "+1" + cellPhone,
    from: "+16465254514",
    body: "Morning Ninja Weather: " + message
  }, function(err, message) {
    console.log(message.sid);
  });

};
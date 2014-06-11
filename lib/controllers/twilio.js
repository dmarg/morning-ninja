'use strict';
var accountSid = 'AC0a2f449bbe946ca22749cc46727e3152';
var authToken = '7d7cd03e706dd489628b774c31c46aba';

// var client = require('twilio')(accountSid, authToken);

var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    Weather = mongoose.model('Weather');


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
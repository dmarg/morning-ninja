'use strict';
// var client = require('twilio')(accountSid, authToken);
var config = require('../config/config');
var wMessage = require('../weatherMessageGenerator');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    Weather = mongoose.model('Weather');

var accountSid = config.apiKeys.twilioAccountSid;
var authToken = config.apiKeys.twilioAuthToken;

var client = require('twilio')(accountSid, authToken);

// Function to send automated SMS
exports.sendWeatherSMS = function(cellPhone, message) {

  client.messages.create({
    to: "+1" + cellPhone,
    from: "+16465254514",
    body: message
  }, function(err, message) {
    if(err) {
      console.log('message: ', err.message);
    } else {
      // console.log(message.sid);
    }
  });

};


// Function for heart icon on front page when you are signed in
exports.sendSMS = function(req, res) {

  var weather = req.body.weather;
  var cellPhone = req.body.cellPhone;
  var name = req.body.fname;

  // console.log('sms message ', message);

  //require the Twilio module and create a REST client
  // var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "+1" + cellPhone,
    from: "+16465254514",
    body: "♥ " + wMessage.getWeatherMessage(weather, name)
  }, function(err, message) {

    if(err) {
      console.log(err);
      res.send(400);
    } else {
      // console.log(message.sid);
      res.send(message);
    }


  });

};
'use strict';
var accountSid = 'AC0a2f449bbe946ca22749cc46727e3152';
var authToken = '7d7cd03e706dd489628b774c31c46aba';

var client = require('twilio')(accountSid, authToken);

var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode');


exports.sendSMS = function(req, res) {

  var weatherSummary = req.body.daily.summary;



  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "+14042199656",
    from: "+16465254514",
    body: "Morning Ninja Weather: " + weatherSummary
  }, function(err, message) {
    console.log(message.sid);
    res.send(message);
  });

};
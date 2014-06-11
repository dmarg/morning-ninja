'use strict';

var moment = require('moment');
var schedule = require('node-schedule');
var twilio = require('../lib/controllers/twilio');
var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode'),
    User = mongoose.model('User'),
    Weather = mongoose.model('Weather');


// Set up interval for recurring schedule tasks to check DB
var intervalRule = new schedule.RecurrenceRule();
intervalRule.minute = [0, new schedule.Range(0, 60, 15)];


// Search DB for
var findAndSendWeather = function() {
  // var currentTime = moment().utc().seconds(0).milliseconds(0);
  var date = new Date();
  var currentHour = date.getUTCHours();
  var currentMin = date.getUTCMinutes();
  var currentTime = currentHour + ':' + currentMin + ':00';

  console.log('current time: ', currentTime);

  // put this morningTime: currentTime in User.find

  User.find({morningTime: currentTime}, function(err, users) {
    users.forEach(function(user){
      console.log(user);

      var name = user.name.split(' ')[0]; // Only grabbing first name;
      var cellPhone = user.cellPhone;
      var zipcode = user.zipcode;

      Weather.findOne({zipcode: zipcode}, function(err, wData) {

        var maxTemp = Math.ceil(wData.weatherData.daily.data[0].temperatureMax);
        var minTemp = Math.floor(wData.weatherData.daily.data[0].temperatureMin);
        var dailySummary = wData.weatherData.daily.data[0].summary;

        var weatherMessage = dailySummary + ' Daily Temps: H:' + maxTemp + ' / L:' + minTemp + '.';

        twilio.sendWeatherSMS(name, cellPhone, weatherMessage);

      });

    });
  });
};

var sendText = schedule.scheduleJob(intervalRule, findAndSendWeather);
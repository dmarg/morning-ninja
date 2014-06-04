'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
  apiKey: 'AIzaSyCDvij0xvRUpHgqiuIf29JYVZBI1PzE1K0'
};

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, extra);

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

// Obtain Zip Code and Convert it to Latitude and Longitude Coordinates
exports.zipToLatLng = function(req, res) {
  console.log(req.body);
  geocoder.geocode(req.body.userZip, function(err, res) {
    console.log(res);
  });
};
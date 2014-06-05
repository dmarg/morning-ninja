'use strict';

var mongoose = require('mongoose'),
    Geocode = mongoose.model('Geocode');

var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
  apiKey: 'AIzaSyCDvij0xvRUpHgqiuIf29JYVZBI1PzE1K0'
};

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, extra);

// Obtain Zip Code and Convert it to Latitude and Longitude Coordinates
exports.zipToLatLng = function(req, res) {
  console.log(req.body);
  var zipToCheck = req.body.userZip;

  Geocode.findOne({zipcode: zipToCheck}, function (err, zip) {
    if (zip) {
      res.json(zip);
    } else {
      geocoder.geocode(zipToCheck, function(err, geo) {

        if(err || !geo || geo[0].country !== 'United States') {
          res.json({error: "not valid zipcode"});
          // res.send(501);
        } else {
          console.log(geo[0]);

          var newGeo = geo[0];

          var newZip = new Geocode({
            zipcode: newGeo.zipcode,
            latitude: newGeo.latitude,
            longitude: newGeo.longitude,
            city: newGeo.city,
            state: newGeo.state,
            stateCode: newGeo.stateCode,
            country: newGeo.country,
            countryCode: newGeo.countryCode
          });

          newZip.save(function(err) {
            if (err) {console.log(err);}
          });

          res.json(newGeo);
        }
      });
    }
  });
};

exports.getWeatherData = function(req, res) {



};


/**
 * Get awesome things
 */
// exports.awesomeThings = function(req, res) {
//   return Thing.find(function (err, things) {
//     if (!err) {
//       return res.json(things);
//     } else {
//       return res.send(err);
//     }
//   });
// };
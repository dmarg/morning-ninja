'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Geocode Schema
 */
var GeocodeSchema = new Schema({
  zipcode: String,
  latitude: Number,
  longitude: Number,
  city: String,
  state: String,
  stateCode: String,
  country: String,
  countryCode: String
});

/**
 * Validations
 */
GeocodeSchema.path('zipcode').validate(function (str) {
  return (/^[0-9]{5}$/g).test(str);
}, 'Zipcode may only be numbers and 5 digits in length');

mongoose.model('Geocode', GeocodeSchema);

// { userZip: '20008' }
// { latitude: 38.9451658,
//   longitude: -77.0622028,
//   country: 'United States',
//   city: 'Washington',
//   state: 'District of Columbia',
//   stateCode: 'DC',
//   zipcode: '20008',
//   streetName: null,
//   streetNumber: null,
//   countryCode: 'US' }
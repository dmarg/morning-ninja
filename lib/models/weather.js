'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Weather Schema
 */
var weatherSchema = new Schema({
  zipcode: String,
  latitude: Number,
  longitude: Number,
  day: String,
  weatherData: Schema.Types.Mixed
});

/**
 * Validations
 */

mongoose.model('Weather', weatherSchema);


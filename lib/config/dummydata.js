'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Populate database with sample application data
 */


// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    morningTime: '11:15:00',
    localTime: '2014-09-07 11:15:00.000Z',
    email: 'test@test.com',
    password: 'test',
    cellPhone: '1234567890',
    zipcode: '10038'
  }, function() {
      console.log('finished populating users');
    }
  );
});

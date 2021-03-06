'use strict';

var zips = require('./controllers/zips'),
    weatherData = require('./controllers/weatherData'),
    twilio = require('./controllers/twilio'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  // app.route('/api/awesomeThings')
  //   .get(api.awesomeThings);
  app.route('/zips/geocode')
    .post(zips.zipToLatLng);
  app.route('/weatherData/getWeatherData')
    .post(weatherData.getWeatherData);

  app.route('/twilio/sendSMS')
    .post(twilio.sendSMS);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/users/time')
    .put(users.changeAlertTime);

  app.route('/api/users/zipcode')
    .put(users.changeZipCode);

  app.route('/api/users/delete/:id')
    .delete(users.deleteUser);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};
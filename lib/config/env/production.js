'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        '0.0.0.0',
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,
  mongo: {
    uri: 'mongodb://localhost/morning-ninja' ||
         process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME
  },
  apiKeys: {
    weatherApiKey: process.env.WEATHER_API,
    googleGeocodeKey: process.env.GOOGLE_GEOCODE,
    twilioAccountSid: process.env.TWILIO_ACCOUNT,
    twilioAuthToken: process.env.TWILIO_AUTH
  }
};
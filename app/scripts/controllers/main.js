'use strict';

angular.module('morningNinjaApp')
  .controller('MainCtrl', function ($scope, $http) {


    $scope.user = {};

    $http.get('/api/users/me').success(function(user) {
      $scope.user._id = user._id;
      $scope.user.email = user.email;
      $scope.user.cellPhone = user.cellPhone;
      $scope.user.zipcode = user.zipcode;
      $scope.user.morningTime = user.morningTime;
      $scope.user.firstName = user.name.split(' ')[0];

      $scope.user.newLocalTime = new Date(user.localTime);

    });


    $scope.submitZip = function() {

      $http.post('/zips/geocode', $scope.user).success(function(data) {

        $scope.retData = data;

        if (data.hasOwnProperty('error')) {
          console.log(data);
        } else {
          $http.post('/weatherData/getWeatherData', $scope.retData).success(function(wData) {
            console.log('returned from forecast: ', wData);
            $scope.wData = angular.fromJson(wData);

            var maxTemp = Math.ceil(wData.daily.data[0].temperatureMax);
            var minTemp = Math.floor(wData.daily.data[0].temperatureMin);
            var dailySummary = wData.daily.data[0].summary;


            $scope.weatherMessage = {
                weather: dailySummary + ' Daily Temps: H:' + maxTemp + ' / L:' + minTemp + '.',
                cellPhone: $scope.user.cellPhone
              };

            // Functionality to send text message on submit
            $http.post('/twilio/sendSMS', $scope.weatherMessage).success(function(sms) {
              console.log('twilio: ', sms);
            });

          });
        }

      });

    };
  });

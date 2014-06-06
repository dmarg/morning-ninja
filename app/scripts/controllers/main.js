'use strict';

angular.module('morningNinjaApp')
  .controller('MainCtrl', function ($scope, $http) {

    // $http.get('/api/awesomeThings').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    $scope.zipArr = [];

    $scope.zipCode = {userZip: ''};

    $scope.submitZip = function() {
      $scope.zipArr.push($scope.zipCode);

      $http.post('/zips/geocode', $scope.zipCode).success(function(data) {
        // $scope.awesomeThings = awesomeThings;
        $scope.retData = data;

        console.log('submitted zip:', $scope.zipArr[$scope.zipArr.length-1], ' returns ',data);

        if (data.hasOwnProperty('error')) {
          $scope.zipError = true;
        } else {
          $http.post('/weatherData/getWeatherData', $scope.retData).success(function(wData) {
            console.log('returned from forecast: ', wData);
            $scope.wData = angular.fromJson(wData);

            var maxTemp = Math.ceil(wData.daily.data[0].temperatureMax);
            var minTemp = Math.floor(wData.daily.data[0].temperatureMin);
            var dailySummary = wData.daily.data[0].summary;


            $scope.weatherMessage = {weather: dailySummary + ' Daily Temps: H:' + maxTemp + ' / L:' + minTemp + '.'};

            // Functionality to send text message on submit
            // $http.post('/twilio/sendSMS', $scope.weatherMessage).success(function(sms) {
            //   console.log('twilio: ', sms);
            // });

          });
        }

      });

      $scope.zipCode = {userZip: ''};
    };
  });

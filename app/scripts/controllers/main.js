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
      $scope.user.name = user.name;

      $scope.user.newLocalTime = new Date(user.localTime);

    });


    $scope.submitZip = function() {

      $http.post('/zips/geocode', $scope.user).success(function(data) {

        $scope.retData = data;
        $scope.retData.fname = $scope.user.name.split(' ')[0];
        // console.log($scope.retData);
        if (data.hasOwnProperty('error')) {
          console.log(data);
        } else {
          $http.post('/weatherData/getWeatherData', $scope.retData).success(function(wData) {
            console.log('returned from forecast: ', wData);
            $scope.wData = angular.fromJson(wData);

            var weatherMessage = {
                weather: wData,
                cellPhone: $scope.user.cellPhone,
                fname: $scope.retData.fname
              };

            // Functionality to send text message on submit
            $http.post('/twilio/sendSMS', weatherMessage).success(function(sms) {
              // console.log('twilio: ', sms);
            });

          });
        }

      });

    };
  });

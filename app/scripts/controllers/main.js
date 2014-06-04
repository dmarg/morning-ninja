'use strict';

angular.module('morningNinjaApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.latAndLong = [];

    $scope.zipCode = {userZip: ''};

    $scope.submitZip = function() {
      $scope.latAndLong.push($scope.zipCode);

      $http.post('/api/awesomeThings', $scope.zipCode).success(function(err, awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });

      $scope.zipCode = {userZip: ''};
    };
  });

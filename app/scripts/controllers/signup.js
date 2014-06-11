'use strict';

angular.module('morningNinjaApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, ZipCode) {
    $scope.user = {};
    $scope.errors = {};

    //Patterns for text field inputs
    $scope.zipcodePattern = /^[0-9]{5}$/g;
    $scope.cellPhonePattern = /^[0-9]{10}$/g;

    //timepicker
    $scope.user.morningTime = new Date('September 07, 2014 07:30:00');
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = true;

    // Validate Zip Code
    $scope.$watch('user.zipcode', function(newzip, oldzip) {
      // console.log('zip', newzip, oldzip);
      // console.log('newzip test:', (/^[0-9]{5}$/g).test(newzip));

      if((/^[0-9]{5}$/g).test(newzip)) {
        ZipCode.isZipValid($scope.user).success(function(data) {
          // console.log('GeoLookup results: ', data);
          if(data.hasOwnProperty('error')) {
            alert(data.error);
            $scope.user.zipcode = '';
          }
        });
      }
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      console.log($scope.user);

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          zipcode: $scope.user.zipcode,
          cellPhone: $scope.user.cellPhone,
          morningTime: $scope.user.morningTime.getUTCHours() + ':' + $scope.user.morningTime.getUTCMinutes() + ':00',
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
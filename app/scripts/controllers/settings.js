'use strict';

angular.module('morningNinjaApp')
  .controller('SettingsCtrl', function ($scope, $http, $location, User, Auth, ZipCode) {
    $scope.errors = {};
    $scope.user = {};

    //Patterns for text field inputs
    $scope.zipcodePattern = /^[0-9]{5}$/g;
    $scope.cellPhonePattern = /^[0-9]{10}$/g;

    $http.get('/api/users/me').success(function(user) {
      $scope.user._id = user._id;
      $scope.user.email = user.email;
      $scope.user.cellPhone = user.cellPhone;
      $scope.user.zipcode = user.zipcode;
      $scope.user.morningTime = user.morningTime;

      $scope.user.newLocalTime = new Date(user.localTime);

    });

    // Delete Key Generator
    function deleteKey() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
    $scope.user.deleteKey = deleteKey();
    $scope.user.deleteKeyConfirm = '';
    $scope.user.deleteKeyinValid = true;


    // $scope.user.newMorningTime = new Date('September 07, 2014 7:30:00');
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = true;


    $scope.clearTab = function() {
     $scope.user.oldPassword = '';
     $scope.user.newPassword = '';
     $scope.user.deleteKeyConfirm = '';
    };

    $scope.clearMessage = function() {
      $scope.message = '';
    };

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

    $scope.changePassword = function(formPass) {
      $scope.submitted = true;

      if(formPass.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          formPass.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

    $scope.changeMorningTime = function(formTime) {
      $scope.submitted = true;

      if(formTime.$valid) {

        var newData = {
          userId: $scope.user._id,
          newMorningTime: $scope.user.newLocalTime.getUTCHours() + ':' + $scope.user.newLocalTime.getUTCMinutes() + ':00',
          newLocalTime: $scope.user.newLocalTime
        };

        $http.put('/api/users/time', newData).success(function(data) {
          $scope.retdata = data;
          console.log(data);
        }).then( function() {
          $scope.message = 'Morning message time successfully updated.';
          $scope.submitted = false;
        });
      }

    };

    $scope.changeZipCode = function(formZip) {
      $scope.submitted = true;

      if(formZip.$valid) {
        $http.put('/api/users/zipcode', {userId: $scope.user._id, zipcode: $scope.user.zipcode}).success(function(data) {
          $scope.retdata = data;
        }).then( function() {
          $scope.message = 'Zip Code successfully updated.';
          $scope.submitted = false;
        });
      }

    };

    $scope.deleteUser = function(formDelete) {

      if(formDelete.$valid) {

        if($scope.user.deleteKeyConfirm === $scope.user.deleteKey) {

          $http.delete('/api/users/delete/' + $scope.user._id).success(function(data) {
            $scope.message = 'DELETED!' + data;
          }).then( function() {
            $location.path('/');
          });

        } else {
          $scope.message = 'Delete Key did not match. Please Try again.';
        }

      }

    };



  });

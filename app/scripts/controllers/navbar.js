'use strict';

angular.module('morningNinjaApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'show': function(){return true;}
    }, {
      'title': 'Settings',
      'link': '/settings',
      'show': function() {
        if ($rootScope.currentUser) {
          return true;
        }
        return false;
      }
    }, {
      'title': 'Login',
      'link': '/login',
      'show': function() {
        if ($rootScope.currentUser) {
          return false;
        }
        return true;
      }
    }, {
      'title': 'Sign up',
      'link': '/signup',
      'show': function() {
        if ($rootScope.currentUser) {
          return false;
        }
        return true;
      }
    }, {
      'title': 'Logout',
      'link': '',
      'show': function() {
        if ($rootScope.currentUser) {
          return true;
        }
        return false;
      },
      'click': function() {
       if ($rootScope.currentUser) {
          return $scope.logout();
        }
        return '';
      }
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

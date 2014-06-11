'use strict';

angular.module('morningNinjaApp')
  .factory('ZipCode', function ($http, $location, $rootScope, Session, User, $cookieStore) {

    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {
      isZipValid: function(scope) {
        return $http.post('/zips/geocode', scope);
      },

      changeZip: function(scope) {
        // change zip code function
      }

    };
  });
'use strict';

angular.module('morningNinjaApp')
  .factory('ZipCode', function ($http) {

    return {
      isZipValid: function(scope) {
        return $http.post('/zips/geocode', scope);
      },

    };
  });
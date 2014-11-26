'use strict';

angular.module('morningNinjaApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });

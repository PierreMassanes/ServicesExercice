'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:ListProjectsCtrl
 * @description
 * # ListProjectsCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ListProjectsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    $scope.go = function ( path ) {
      $location.path( path );
    };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:ListUsersCtrl
 * @description
 * # ListUsersCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ListUsersCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.searchUser = data.data;
      });

    $scope.go = function ( path ) {
      $location.path( path );
    };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ProjectCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    if($routeParams.projectId) {

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.project = data.data;
          }
        });

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
        .success(function(data) {
          if (data.status == "success") {
            $scope.users = data.data;
          }
        });

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles')
        .success(function(data) {
          if (data.status == "success") {
            $scope.roles = data.data;
          }
        });
    }
  }]);

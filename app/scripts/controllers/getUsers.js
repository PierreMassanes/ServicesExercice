'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:GetUsersCtrl
 * @description
 * # GetUsersCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('GetUsersCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.searchUser = data.data;
      });

  }]);

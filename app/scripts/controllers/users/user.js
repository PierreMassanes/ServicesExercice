'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UserCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    if($routeParams.userId) {

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
          }
        });

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
        .success(function(data) {
          if (data.status == "success") {
            $scope.projects = data.data;
          }
        });

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Roles')
        .success(function(data) {
          if (data.status == "success") {
            $scope.roles = data.data;
          }
        });

      $scope.deleteUser = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id)
          .success(function(){
            $scope.success = true;
          });
      }

      $scope.updateUser = function(){
        if($scope.currentUser.name != null && $scope.currentUser.surname != null){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id, $scope.currentUser)
            .success(function(data) {
              $scope.newUser = data.data;
            });
        }
      }

    }
  }]);

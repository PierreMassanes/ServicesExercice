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

    $scope.user = {
      name: null,
      surname: null,
      email: null,
      website: null
    };

    $scope.newProjects = [];

    $scope.addUser = function(){
      if($scope.user.name != null && $scope.user.surname != null){
        if($scope.user.email == "")
          $scope.user.email = null;

        if($scope.user.website == "")
          $scope.user.website = null;

        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', $scope.user)
          .success(function(data) {
            $scope.success = true;
          });
      }

    }

    $scope.addProjectToUser = function(){

    }

    $scope.removeProjectFromUser = function(){

    }

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
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ $routeParams.userId)
          .success(function(){
            $scope.success = true;
          });
      }

      $scope.updateUser = function(){
        if($scope.currentUser.name != null && $scope.currentUser.surname != null){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id, $scope.currentUser)
            .success(function(data) {
              $scope.success = true;
            });
        }
      }

    }
  }]);

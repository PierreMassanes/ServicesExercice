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

      $scope.deleteProject = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Project/'+$scope.project.id)
          .success(function(){
            $scope.success = true;
          });
      }

      $scope.updateProject = function(){
        if($scope.project.title != null && $scope.project.title != ""){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$scope.project.id, $scope.project)
            .success(function(data) {

            });
        }
      }
    }
  }]);

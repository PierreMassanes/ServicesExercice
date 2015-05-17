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
            $scope.user = data.data;

            angular.forEach($scope.newProjects, function(newProj){
              $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+newProj.id+'/Users/'+$scope.user.id, $scope.user)
                .success(function (data) {
                  $scope.success = true;
                });
            });

          });
        }
    };

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    $scope.addProjectToUser = function(){
      if(($scope.newProjects.indexOf($scope.selectProject) == -1) && $scope.selectProject.id != null)
        $scope.newProjects.push($scope.selectProject);
    };

    $scope.removeProjectFromUser = function(index){
      $scope.newProjects.splice(index, 1);
    };

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
            $scope.userProjects = data.data;
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

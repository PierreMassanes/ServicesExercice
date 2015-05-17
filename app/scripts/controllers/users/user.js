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

    /* Add a user */
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

    /* Get all projects */
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    $scope.addProjectToUser = function(){
      var toAdd = true;
      angular.forEach($scope.newProjects, function(proj){
        if(proj.id == $scope.selectProject.id){
          toAdd = false;
          return;
        }
      });

      if(toAdd)
        $scope.newProjects.push($scope.selectProject);
      /*if(($scope.newProjects.indexOf($scope.selectProject) == -1) && $scope.selectProject.id != null)
        $scope.newProjects.push($scope.selectProject);*/
    };

    $scope.removeProjectFromUser = function(index){
      $scope.newProjects.splice(index, 1);
    };




    /* ******************************* When showing a specific user *********************************** */
    if($routeParams.userId) {

      /* Get the user */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
          }
        });

      /* Get the user's projects */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
        .success(function(data) {
          if (data.status == "success") {
            $scope.userProjects = data.data;
            $scope.newProjects = angular.copy($scope.userProjects);
          }
        });

      /* Get the user's roles */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Roles')
        .success(function(data) {
          if (data.status == "success") {
            $scope.roles = data.data;
          }
        });

      /* Delete the current user */
      $scope.deleteUser = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ $routeParams.userId)
          .success(function(){
            $scope.success = true;
          });
      }

      /* Update the current user */
      $scope.updateUser = function(){
        if($scope.currentUser.name != null && $scope.currentUser.surname != null){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id, $scope.currentUser)
            .success(function(data) {

              angular.forEach($scope.userProjects, function(proj){
                $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + proj.id + '/Users/' + $routeParams.userId)
                  .success(function(){
                    $scope.success = true;
                  })
              });

              angular.forEach($scope.newProjects, function(proj){
                $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+proj.id+'/Users/'+ $routeParams.userId, $scope.currentUser)
                  .success(function (data) {
                    $scope.success = true;
                  });
              });

            });
        }
      };

    }
  }]);

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

    $scope.project = {
      title: null,
      description:null,
      year: null
    };

    /* Add a project */
    $scope.newUsers = [];
    $scope.addProject = function(){
      if($scope.project.title != null && $scope.project.title != ""){
        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', $scope.project)
          .success(function(data) {
            $scope.project = data.data;

            angular.forEach($scope.newUsers, function(newUser){
              $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$scope.project.id+'/Users/'+newUser.id, newUser)
                .success(function (data) {
                  $scope.success = true;
                });
            });
          });
      }
    };

    /* Get all users */
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    $scope.addUserToProject = function(){
      var toAdd = true;
      angular.forEach($scope.newUsers, function(user){
        if(user.id == $scope.selectUser.id){
          toAdd = false;
          return;
        }
      });

      if(toAdd)
        $scope.newUsers.push($scope.selectUser);
    };

    $scope.removeUserFromProject = function(index){
      $scope.newUsers.splice(index, 1);
    };

    /* ******************************* When showing a specific project *********************************** */
    if($routeParams.projectId) {

      /* Get the project */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentProject = data.data;
          }
        });

      /* Get the project's users */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
        .success(function(data) {
          if (data.status == "success") {
            $scope.projectUsers = data.data;
            $scope.newUsers = angular.copy($scope.projectUsers);
          }
        });

      /* Get the project's roles */
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Roles')
        .success(function(data) {
          if (data.status == "success") {
            $scope.roles = data.data;
          }
        });

      /* Delete the current project */
      $scope.deleteProject = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+ $routeParams.projectId)
          .success(function(){
            $scope.success = true;
          });
      };

      /* Update the current user */
      $scope.updateProject = function(){
        if($scope.currentProject.title != null && $scope.currentProject.title != ""){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$scope.currentProject.id, $scope.currentProject)
            .success(function(data) {

              /*angular.forEach($scope.newUsers, function(user){
                var exists = false;
                var index = -1;
                angular.forEach($scope.projectUsers, function(oldUser){
                  index++;
                  if(user.id == oldUser.id) {
                    exists = true;
                    return;
                  }

                });

                if(exists == true) {
                  $scope.test = "TEST";
                  $scope.projectUsers.splice(index, 1);
                }else{
                  $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$routeParams.projectId+'/Users/'+ user.id, user)
                    .success(function (data) {
                      $scope.success = true;
                    });
                }
              });*/


              angular.forEach($scope.projectUsers, function(user){

                $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users/' + user.id)
                  .success(function(){
                    $scope.success = true;
                  })
              });

              angular.forEach($scope.newUsers, function(user){
                $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$routeParams.projectId+'/Users/'+ user.id, user)
                  .success(function (data) {
                    $scope.success = true;
                  });
              });

            });
        }
      };
    }
  }]);

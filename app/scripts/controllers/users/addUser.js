'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AddUserCtrl
 * @description
 * # AddUserCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('AddUserCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.user = {
      name: null,
      surname: null,
      email: null,
      website: null
    };

    $scope.newProjects = [];

    $scope.addUser = function(){
      $scope.isAdded = false;

      if($scope.user.name != null && $scope.user.surname != null){
        if($scope.user.email == "")
          $scope.user.email = null;

        if($scope.user.website == "")
          $scope.user.website = null;

        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', $scope.user)
          .success(function(data) {
            $scope.isAdded = true;
            $scope.newUser = data.data;
          });
      }

    }

    $scope.addProjectToUser = function(){

    }

    $scope.removeProjectFromUser = function(){

    }

  }]);

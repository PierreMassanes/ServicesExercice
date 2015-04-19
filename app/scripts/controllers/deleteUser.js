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
      userName: "",
      userSurname: "",
      userEmail: "",
      userWebsite: ""
    };

    $scope.addUser = function(){

      if($scope.user.userName && $scope.user.userSurname){
        $scope.json = angular.toJson($scope.user);
        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users', $scope.json)
          .success(function(data) {
            $scope.isAdded = true;
            $scope.newUser = data;
          });
      }

    }

  }]);

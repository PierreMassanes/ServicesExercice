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

      $scope.deleteUser = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id)
          .success(function(){
            $scope.success = true;
          });
      }

     /*   $scope.updUser = {
        id: $scope.currentUser.id,
        name: $scope.currentUser.name,
        surname: $scope.currentUser.surname,
        email: $scope.currentUser.email,
        website: $scope.currentUser.website,
        createdAt: $scope.currentUser.createdAt,
        updatedAt: $scope.currentUser.updatedAt
      }*/

      $scope.updateUser = function(){
        if($scope.updUser.name != null && $scope.updUser.surname != null){
          $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$scope.currentUser.id, $scope.updUser)
            .success(function(data) {
              $scope.newUser = data.data;
            });
        }
      }

    }
  }]);

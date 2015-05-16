'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AddProjectCtrl
 * @description
 * # AddProjectCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('AddProjectCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.project = {
      title: null,
      year: null
    };

    $scope.addProject = function(){

      if($scope.project.title != null && $scope.project.title != ""){
        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', $scope.project)
          .success(function(data) {
            $scope.success = true;
          });
      }

    }

  }]);

'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:MainMenuCtrl
 * @description
 * # MainMenuCtrl
 * Controller of the showcaseApp
 */
angular.module('pooIhmExemplesApp')
  .controller('MainMenuCtrl', function ($scope) {
    $scope.menuItems = [["Users","#/users"], ["Projects","#/projects"]];

    $scope.selectedIndex = 0;

    $scope.itemClicked = function($index){
      $scope.selectedIndex = $index;
    }
  });

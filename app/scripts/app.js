'use strict';

/**
 * @ngdoc overview
 * @name pooIhmExemplesApp
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
angular
  .module('pooIhmExemplesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/listUsers.html',
        controller: 'ListUsersCtrl'
      })
      .when('/addUser' , {
        templateUrl: 'views/addUser.html',
        controller: 'AddUserCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/detailUser.html',
        controller: 'UserCtrl'
      })
      .when('/users/:userId/edit', {
        templateUrl: 'views/editUser.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

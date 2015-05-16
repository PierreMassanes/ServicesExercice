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
        templateUrl: '../views/users/listUsers.html',
        controller: 'ListUsersCtrl'
      })
      .when('/users', {
        templateUrl: '../views/users/listUsers.html',
        controller: 'ListUsersCtrl'
      })
      .when('/users/add' , {
        templateUrl: '../views/users/addUser.html',
        controller: 'AddUserCtrl'
      })
      .when('/users/:userId', {
        templateUrl: '../views/users/detailUser.html',
        controller: 'UserCtrl'
      })
      .when('/users/:userId/edit', {
        templateUrl: '../views/users/editUser.html',
        controller: 'UserCtrl'
      })
      .when('/projects', {
        templateUrl: '../views/projects/listProjects.html',
        controller: 'ListProjectsCtrl'
      })
      .when('/projects/add' , {
        templateUrl: '../views/projects/addProject.html',
        controller: 'AddProjectCtrl'
      })
      .when('/projects/:projectId', {
        templateUrl: '../views/projects/detailProject.html',
        controller: 'ProjectCtrl'
      })
      .when('/projects/:projectId/edit', {
        templateUrl: '../views/projects/editProject.html',
        controller: 'ProjectCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  }]);

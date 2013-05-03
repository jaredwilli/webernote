'use strict';

var app = window.app = angular.module('angApp', ['firebase']);

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
			})
/*
			.when('/login', {
				templateUrl: 'views/main.html',
				controller: 'LoginCtrl'
			})
			.when('/logout', {
				templateUrl: 'views/main.html',
				controller: 'LoginCtrl'
			})
*/
			.when('/user/:userId', {
				templateUrl: 'views/main.html',
				controller: 'UsersCtrl'
			})
			/*.when('/newNote', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})*/
			.otherwise({
				redirectTo: '/'
			});
	}
]).

run([
	'$rootScope',
	'$location',
	'authService',
	'angularFire',

	function($rootScope, $location, authService, angularFire) {


	}
]);
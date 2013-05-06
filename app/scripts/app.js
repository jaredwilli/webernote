'use strict';

var app = window.app = angular.module('angApp', ['ui', 'firebase']);

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
			})
			.when('/user/:userId', {
				templateUrl: 'views/main.html',
				controller: 'UserCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]).

run([
	'$rootScope',
	'$location',
	'angularFire',

	function($rootScope, $location, angularFire) {


	}
]);
'use strict';

var app = window.app = angular.module('angApp', ['firebase']);

app.config([
	'$routeProvider',
	function($routeProvider) {

		$routeProvider.
			when('/', {
				//templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			}).
			when('/user/:userId', {
				templateUrl: 'views/main.html',
			}).
			when('/user/:userId/note/:noteId', {
				templateUrl: 'views/main.html',
				controller: 'NoteCtrl'
			}).
			otherwise({
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
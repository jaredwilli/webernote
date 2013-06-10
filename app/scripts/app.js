'use strict';

var app = window.app = angular.module('angApp', ['firebase']);

app.config([
	'$routeProvider',
	function($routeProvider) {

		$routeProvider.
			when('/', {
				/*templateUrl: 'views/login.html',*/
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
]);
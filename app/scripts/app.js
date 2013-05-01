'use strict';

var app = window.app = angular.module('angApp', ['firebase']);

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/login', {
				templateUrl: 'views/main.html',
				controller: 'LoginCtrl'
			})
			.when('/logout', {
				templateUrl: 'views/main.html',
				controller: 'LoginCtrl'
			})
			// .when('/users', {
			// 	templateUrl: 'views/users.html',
			// 	controller: 'UsersCtrl'
			// })
			/*.when('/newNote', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})*/
			.otherwise({
				redirectTo: '/'
			});
	}
])/*.

run('angApp', [
	'$rootScope',

	function($rootScope) {
		$rootScope.authObj = {
			provider: 'twitter',
			isAuthenticated: localStorage.getItem('authenticated'),
			authToken: localStorage.getItem('authToken')
		};
	}
]);*/;
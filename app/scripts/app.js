'use strict';

/*angular.module('firebase', []).value('Firebase', Firebase);
angular.module('firebaseAuthClient', []).value('FirebaseAuthClient', FirebaseAuthClient);*/

var app = window.app = angular.module('angApp', ['firebase', 'firebaseAuth']);

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
			// .when('/logout', {
			// 	templateUrl: 'views/main.html',
			// 	controller: 'LoginCtrl'
			// })
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
]);
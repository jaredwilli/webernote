'use strict';

angular.module('angApp').

controller('MainCtrl', [
	'$scope',
	'$location',
	'filterFilter',
	'angularFire',
	'fireFactory',

	function MainCtrl($scope, $location, filterFilter, angularFire, fireFactory) {
		var baseurl = 'https://webernote.firebaseio.com';

		var usersurl = baseurl + '/users/',
			usersRef = angularFire(usersurl, $scope, 'users', {});

		var authCallback = function(error, user) {
			if (error) {
				console.log(error);
			} else if (user) {
				// Set the userRef on the $rootScope
				var userRef = angularFire(usersurl + user.id, $scope, 'user', {});

				userRef.then(function(user) {
					console.log(user);
					startWatch($scope, filterFilter);
				});
			} else {
				// Logged out
			}
		},
		authClient = new FirebaseAuthClient(fireFactory.firebaseRef('users'), authCallback);


		if ($location.path() === '') {
			$location.path('/');
		}

		$scope.location = $location;


		$scope.login = function() {
			var token = localStorage.getItem('token'),
				provider = 'twitter',
				options = { 'rememberMe': true };
			console.log(token);
			if (token) {
				fireFactory.firebaseRef('users').auth(token, authCallback);
			} else {
				authClient.login(provider, options);
			}
		};

		$scope.logout = function() {
			fireFactory.firebaseRef('users').unauth();
		};


		function startWatch($rootScope, filterFilter) {
			console.log($scope, filterFilter());

			$scope.$watch('users', function(users) {
				console.log(users);
			});

			$scope.$watch('location.path()', function(path) {
				//$scope.statusFilter = (path === '/active') ?
			});



			/*
			userRef.once('value', function(data) {
					// Set the userRef children if this is first login
					var val = data.val();
					var info = {
						userId: user.id,
						name: user.name,
						notes: '',
						tags: '',
						notebooks: ''
					};
					// Use snapshot value if not first login
					if (val) {
						info = val;
					}
					userRef.set(info); // set user child data once

					// Store the token and userId in localStorage
					localStorage.setItem('token', user.firebaseAuthToken);
			*/
		}
	}
]).
/*
controller('LoginCtrl', [
	'$rootScope',
	'$location',
	'authService',
	function LoginCtrl($rootScope, $location, authService) {
		// Set user info on $rootScope if session token exists otherwise redirect to login
		if ($rootScope.session.token) {
			authService.withToken($rootScope.session.token);
			console.log('with token: ', $rootScope._user);
		}
		else if (!$rootScope.session.token || $rootScope._user) {
			authService.withoutToken.login(provider, options);
			console.log('no token: ', $rootScope);
		}
	}
]).

controller('LogoutCtrl', [
	'$rootScope',
	'$location',
	'authService',
	function LogoutCtrl($rootScope, $location, authService) {
		console.log($rootScope._user);
		$rootScope._user.logout();

		// Redirect to / once logged out
		$location.path('/');
	}
]).
*/

controller('UserCtrl', [
	'$rootScope',
	'$scope',
	'$location',
	'authService',
	'noteFactory',

	function UserCtrl($rootScope, $scope, $location, authService, noteFactory) {
		// Redirect to /login route if currentUser doesn't exist
		// if (!$rootScope.users) {
		// 	$location.path('/login');
		// }

		$scope.notes = noteFactory.getAllNotes('users/' + $rootScope.user.name() + '/notes');
		$scope.editedNote = '';

		$scope.addNote = function() {
			var note = noteFactory.addNote();
			$scope.editNote(note);
		};

		$scope.editNote = function(note) {
			$scope.editedNote = note;
			//console.log($scope.editedNote);
			noteFactory.editNote(note);
		};

		$scope.deleteNote = function(note) {
			noteFactory.deleteNote(note);
		};
	}
]);

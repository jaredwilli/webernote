'use strict';

angular.module('angApp').

factory('authService', [
	'$rootScope',
	'$location',
	'angularFire',
	function($rootScope, $location, angularFire) {
		$rootScope.session = {};
		$rootScope.session.token = localStorage.getItem('token');

		$rootScope.firebase = 'https://webernote.firebaseio.com/';
		$rootScope.users = new Firebase($rootScope.firebase + 'users/');
		$rootScope._users = angularFire($rootScope.firebase +'users/', $rootScope , 'users', {});


		// Set the usersRef on the $rootScope

		var _authAction = {
			unAuth: function() {
				$rootScope.users.unAuth();
			},
			auth: function(err, user) {
				if (err) {
					console.log(err.code);
				} else if (user) {
					console.log($rootScope._users);

					// var promise = angularFire($rootScope.users +'/'+ user.id, $rootScope , user.id, {});
					// promise.then(function(user) {
					// 	$rootScope._user = user;
					// 	//console.log($rootScope);
					// });

					// Set the userRef on the $rootScope
					//var userRef = $rootScope.users.child(user.id);
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

						$rootScope._user = angularFire($rootScope.users +'/'+ user.id, $rootScope, user.id, {});
					});
					*/
				} else {
					//_authAction.unAuth();
				}
			}
		};

		var authenticate = {
			withToken: function(token) {
				$rootScope.users.auth(token, _authAction.auth);
			},
			withoutToken: new FirebaseAuthClient($rootScope.users, _authAction.auth)
		};

		return authenticate;
	}
]);
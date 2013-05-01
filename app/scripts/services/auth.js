'use strict';

angular.module('angApp').

factory('authService', [
	'$rootScope',
	'$location',
	'angularFire',
	function($rootScope, $location, angularFire) {
		var url = 'https://webernote.firebaseio.com/users';
		var baseRef = new Firebase(url);

		var callbacks = {
			unAuth: function() {
				authenticate.authClient.logout();
			},
			auth: function(err, user) {
				if (err) {
					console.log(err.code);
				} else if (user) {
					var user = baseRef.child(user.id).push();

					user.once('value', function(data) {
						var val = data.val(),
							info = {
								userId: user.id,
								name: user.name,
								notes: '',
								tags: '',
								notebooks: ''
							};
						if (val) {
							info = val;
						}
						user.set(info);
					});

					$rootScope.users = angularFire(url, $rootScope , 'users', {});

					$rootScope.users.then(function() {
						$location.path('/');
					});
				} else {
					callbacks.unAuth();
				}
			}
		};

		var authenticate = {
			authClient: new FirebaseAuthClient(baseRef, callbacks.auth)
		};

		return authenticate;
	}
]);
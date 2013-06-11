'use strict';

app.

// TODO: Should rename AuthCtrl to AuthCtrl at some point
controller('AuthCtrl', [
	'$scope',
	'$location',
	'angularFire',
	'fireFactory',

	function AuthCtrl($scope, $location, angularFire, fireFactory) {
		$scope.name = 'AuthCtrl';

		var baseurl = 'https://webernote.firebaseio.com',
			usersurl = baseurl + '/users/',
			usersRef = angularFire(usersurl, $scope, 'users', {});

		// FirebaseAuth callback
		$scope.authCallback = function(error, user) {
			if (error) {
				console.log('error: ', error.code);

				/*if (error.code === 'EXPIRED_TOKEN') {
					$location.path('/');
				}*/
			}
			else if (user) {
				console.log('Logged In', $scope);

				// Store the auth token
				localStorage.setItem('token', user.firebaseAuthToken);
				$scope.isLoggedIn = true;

				$scope.userId = user.id;

				// Set the userRef and add user child refs once
				$scope.userRef = fireFactory.firebaseRef('users').child(user.id);
				$scope.userRef.once('value', function(data) {
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
					$scope.userRef.set(info); // set user child data once
				});

				$scope.promise = angularFire(usersurl + $scope.userRef.name(), $scope, $scope.userRef.name(), {});
				//console.log('promise', $scope.promise, $scope.userRef.name());
				$location.path('/user/' + $scope.userRef.name());

				/*$scope.promise.then(function(user) {
					console.log('user', user);
					//$scope.startWatch($scope, filterFilter);
				});*/
			}
			else {
				localStorage.clear();
				$scope.isLoggedIn = false;
				$location.path('/');
			}
		};

		var authClient = new FirebaseAuthClient(fireFactory.firebaseRef('users'), $scope.authCallback);

		/*if ($location.path() === '') {
			$location.path('/');
		}
		$scope.location = $location;*/


		$scope.login = function(provider) {
			$scope.token = localStorage.getItem('token');

			var options = { 'rememberMe': true };
			provider = provider.toLowerCase() || 'twitter';

			console.log('Provider:', provider);
			//console.log($scope.token);

			if ($scope.token) {
				console.log('login with token', $scope.token);
				fireFactory.firebaseRef('users').auth($scope.token, $scope.authCallback);
			} else {
				console.log('login with authClient');
				authClient.login(provider, options);
			}

		};

		$scope.logout = function() {
			localStorage.clear();
			//fireFactory.firebaseRef('users/' + $scope.userId).unauth();
			authClient.logout();
			$location.path('/');
		};
	}
]);
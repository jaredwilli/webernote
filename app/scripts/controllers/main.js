'use strict';

angular.module('angApp').

controller('MainCtrl', [
	'$scope',
	'$location',
	'angularFire',
	'fireFactory',

	function MainCtrl($scope, $location, angularFire, fireFactory) {
		var baseurl = 'https://webernote.firebaseio.com';

		var usersurl = baseurl + '/users/',
			usersRef = angularFire(usersurl, $scope, 'users', {});


		// FirebaseAuth callback
		$scope.authCallback = function(error, user) {
			if (error) {
				console.log('error: ', error);
			} else if (user) {
				//console.log('Logged In');
				// Store the auth token
				localStorage.setItem('token', user.firebaseAuthToken);

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

				var promise = angularFire(usersurl + $scope.userRef.name(), $scope, $scope.userRef.name(), {});
				console.log(promise);
				promise.then(function(user) {
					console.log(user);
					$location.path('/user/' + $scope.userRef.name());
					//$scope.startWatch($scope, filterFilter);
				});

			} else {
				// Logged out
				console.log('Logged Out');
			}
		};

		var authClient = new FirebaseAuthClient(fireFactory.firebaseRef('users'), $scope.authCallback);

		if ($location.path() === '') {
			$location.path('/');
		}
		$scope.location = $location;


		$scope.login = function() {
			var token = localStorage.getItem('token'),
				provider = 'twitter',
				options = { 'rememberMe': true };

			if (token) {
				console.log('login with token');
				fireFactory.firebaseRef('users').auth(token, $scope.authCallback);
			} else {
				console.log('login with authClient');
				authClient.login(provider, options);
			}
		};

		$scope.logout = function() {
			localStorage.clear();
			fireFactory.firebaseRef('users/' + $scope.userId).unauth();
		};
	}
]).

controller('UserCtrl', [
	'$scope',
	'$location',
	'noteFactory',

	function UserCtrl($scope, $location, noteFactory) {

		//console.log($scope.$parent.user);
		$scope.$parent.$watch('userId', function(userId) {
			//console.log('$watch.userId: ', userId);
			$scope.userId = userId;
			$scope.notes = noteFactory.getAllNotes($scope.userId + '/notes');
		});

		$scope.$watch('location.path()', function(path) {
			//$scope.statusFilter = (path === '/') ? $location.path('/user/' + $scope.userRef.name()) : console.log(path);;
			//console.log($scope, path);
		});

		$scope.editedNote = '';

		$scope.addNote = function() {
			var note = noteFactory.addNote($scope.userId + '/notes');
			console.log('NOTE: ', note);
			$scope.editNote(note);
		};

		$scope.editNote = function(note) {
			$scope.editedNote = note;
			//console.log('editedNote', $scope.editedNote);
			noteFactory.editNote($scope.userId +'/notes', note);
		};

		$scope.deleteNote = function(note) {
			noteFactory.deleteNote($scope.userId +'/notes', note);
		};
	}
]);

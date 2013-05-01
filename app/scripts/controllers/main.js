'use strict';

angular.module('angApp').

controller('MainCtrl', [
	'$rootScope',
	'$scope',
	'$location',
	'authService',
	'noteFactory',

	function MainCtrl($rootScope,$scope, $location, authService, noteFactory) {
		// Redirect to /login route if currentUser doesn't exist
		if (!$rootScope.users) {
			$location.path('/login');
		}

		console.log('Users: ', $rootScope.users);

		$rootScope.users.add = function() {

		};

		$scope.notes = noteFactory.getAllNotes('users/' + authService.currentUser + '/notes');
		$scope.editedNote = '';

		$scope.login = function() {
			$location.path('/login');
		};
		$scope.logout = function() {
			$location.path('/logout');
		};

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
]).

controller('LoginCtrl', [
	'$rootScope',
	'$location',
	'authService',

	function LoginCtrl($rootScope, $location, authService) {
		console.log(authService);
		var provider = 'twitter',
			options = { 'rememberMe': true };

		var user = authService.authClient.login(provider, options);
		console.log($rootScope.users);
	}
]).


controller('LogoutCtrl', [
	'$scope',
	'$location',
	'authService',

	function LogoutCtrl($scope, $location, authService) {
		console.log(authService.logout($scope));
		authService.logout($scope);

		if (!authService.currentUser) {
			$location.path('/');
		}
	}
]);



'use strict';

angular.module('angApp').

controller('UserCtrl', [
	'$rootScope',
	'$scope',
	'$location',
	'authService',
	'noteFactory',

	function UserCtrl($rootScope, $scope, $location, authService, noteFactory) {
		// Redirect to /login route if currentUser doesn't exist
		if (!$rootScope.users) {
			$location.path('/login');
		}

		console.log('Users: ', $rootScope.user);

		/*$rootScope.users.add = function() {

		};*/

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
]);

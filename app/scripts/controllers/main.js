'use strict';

angular.module('angApp').

controller('MainCtrl', [
	'$scope',
	'noteFactory',

	function MainCtrl($scope, noteFactory) {
		console.log(noteFactory);

		$scope.notes = noteFactory.getAllNotes('notes');
		$scope.editedNote = '';

		$scope.addNote = function() {
			noteFactory.addNote();
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
	'$scope',
	'angularFire',
	'authService',

	function LoginCtrl($scope, angularFire, authService) {

	}

]);
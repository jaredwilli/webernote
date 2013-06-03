'use strict';

app.

controller('UserCtrl', [
	'$scope',
	'$location',
	'noteFactory',
	'notebookFactory',
	'tagFactory',

	function UserCtrl($scope, $location, noteFactory, notebookFactory, tagFactory) {
		$scope.name = 'users';
		$scope.editedNote = null;
		$scope.editedNotebook = '';
		$scope.editedTag = '';

		//console.log($scope.$parent.user);
		$scope.$parent.$watch('userId', function(userId) {
			//console.log('$watch.userId: ', userId);
			$scope.userId = userId;

			$scope.notes = noteFactory.getAllNotes($scope.userId + '/notes');
			$scope.notebooks = notebookFactory.getAllNotebooks($scope.userId + '/notebooks');
			$scope.tags = tagFactory.getAllTags($scope.userId + '/tags');

			//console.log($scope.notes);
			//console.log('TAGS: ', $scope.tags);
		});

		$scope.$watch('editedNote', function(editedNote) {
			//console.log(editedNote);

			$scope.editNote(editedNote);
		});

		// Notes

		$scope.addNote = function() {
			var note = noteFactory.addNote($scope.userId + '/notes');
			//console.log('NOTE: ', note);
			$scope.editNote(note);
		};

		$scope.editNote = function(note) {
			$scope.editedNote = note;

			console.log('editedNote', $scope.editedNote);
			noteFactory.editNote($scope.userId + '/notes', note);
		};
		$scope.deleteNote = function(note) {
			// TODO: create a dialog to confirm deletion of note

			noteFactory.deleteNote($scope.userId + '/notes', note);
		};


		// Notebooks
		$scope.addNotebook = function() {
			var notebook = notebookFactory.addNotebook($scope.userId + '/notebooks');
			console.log('NOTEBOOK: ', notebook);
			$scope.editNotebook(notebook);
		};
		$scope.editNotebook = function(notebook) {
			$scope.editedNotebook = notebook;
			//console.log('editedNotebook', $scope.editedNotebook);
			notebookFactory.editNotebook($scope.userId + '/notebooks', notebook);
		};
		$scope.deleteNotebook = function(notebook) {
			notebookFactory.deleteNotebook($scope.userId + '/notebooks', notebook);
		};


		// Tags
		$scope.addTag = function() {
			var tag = tagFactory.addTag($scope.userId + '/tags');
			console.log('TAG: ', tag);
			$scope.editTag(tag);
		};
		$scope.editTag = function(tag) {
			$scope.editedTag = tag;
			//console.log('editedTag', $scope.editedTag);
			tagFactory.editTag($scope.userId + '/tags', tag);
		};
		$scope.deleteTag = function(tag) {
			tagFactory.deleteTag($scope.userId + '/tags', tag);
		};
	}
]);
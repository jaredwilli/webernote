/*
http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/
https://gist.github.com/revolunet/4657146
http://www.bennadel.com/blog/2472-HashKeyCopier-An-AngularJS-Utility-Class-For-Merging-Cached-And-Live-Data.htm
https://github.com/dypsilon/frontend-dev-bookmarks
http://binarymuse.github.io/ngInfiniteScroll/index.html
http://blog.pluralsight.com/2013/06/11/video-testing-angularjs-services-with-dependencies/
http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/

*/

'use strict';

angular.module('angApp').

controller('NoteCtrl', [
	'$scope',
	'$location',
	'noteFactory',
	'notebookFactory',
	'tagFactory',

	function NoteCtrl($scope, $location, noteFactory, notebookFactory, tagFactory) {
		console.log('NoteCtrl scope: ', $scope);

		//console.log($scope.$parent.user);
		$scope.$parent.$watch('userId', function(userId) {
			//console.log('$watch.userId: ', userId);
			$scope.userId = userId;
		});

		debugger;

		// Notebooks
		$scope.addNotebook = function() {
			var notebook = notebookFactory.addNotebook($scope.userId + '/notebooks');
			//console.log('NOTEBOOK: ', notebook);
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
			//console.log('TAG: ', tag);
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

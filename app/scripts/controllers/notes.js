'use strict';

angular.module('angApp').

controller('NoteCtrl', [
	'$scope',
	'$location',
	'noteFactory',
	'notebookFactory',
	'tagFactory',

	function NoteCtrl($scope, $location, noteFactory, notebookFactory, tagFactory) {

		//console.log($scope.$parent.user);
		$scope.$parent.$watch('userId', function(userId) {
			//console.log('$watch.userId: ', userId);
			$scope.userId = userId;
		});
	}
]);
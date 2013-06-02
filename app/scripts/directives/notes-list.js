'use strict';

app.

directive('listNotesBy', function() {
	return {
		restrict: 'A',
		scope: '=',
		templateUrl: 'views/note-list-td.html'
	};
}).

directive('noteSelected', function() {
	return {
		restrict: 'A',
		scope: '@',
		link: function(scope, element, attrs) {

			$(element).on('click', function(e) {
				var parent = scope.$parent;
				console.log('noteDirective parentScope: ', parent);

				$(element).siblings().removeClass('selected');
				element.addClass('selected');

				scope.editNote(parent.note);
			});
		}
	};
});


/*

directive('noteform', function() {
	return {
		restrict: 'E',
		scope: '=',
		templateUrl: 'views/noteform.html',
		link: function(scope, element, attrs) {

			console.log('noteForm scope: ', scope);

			scope.$watch('editedNote', function(note) {
				console.log(note);
			});
		}
	};
}).

directive('blurnote', function() {
	return {
		link: function(scope, element, attrs) {

			element.bind('blur', function() {
				console.log(element);
				console.log(scope);

				scope.editedNote.modified = new Date().getTime();
				scope.editNote(scope.editedNote);

			});
		}
	};
}).

directive('noteListHelper', function() {
	function link($scope, element, attrs) {
		element.on('click', 'li', function(e) {
			console.log(attrs);
		});

		function noteListItem($scope, element, attrs) {
			console.log('linking delegated: ', element);

			$scope.deleteNote = function(note) {
				element.slideUp(100).fadeOut({
					duration: 200,
					queue: false,
					always: function() {
						$scope.$parent.deleteNote(note);
						$scope.$apply();
					}
				});
			};

			element.hide().fadeIn(500);
		}

		// Return the config for directive and define the Controller
		// this is the only way access to $scope pre-linking (no compile function)
		return({
			controller: function($scope) {
				// a hook for the sub-directive that delegates its linking method to the helper
				$scope.delegateDirectiveLinking = function(type, $scope, element, attrs) {
					if (type === 'noteItem') {
						noteListItem($scope, element, attrs);
					}
				};
			},
			link: link,
			restrict: 'A'
		});
	}
}).

directive('noteDelegator', function() {
	function link($scope, element, attrs) {
		// check for a parent directive with exposed delegating link method
		if (! $scope.delegateDirectiveLinking) {
			return;
		}

		$scope.delegateDirectiveLinking(attrs.noteDelegator, $scope, element, attrs);
	}

	return({
		link: link,
		restrict: 'A'
	});
});

*/
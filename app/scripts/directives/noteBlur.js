'use strict';

app.

directive('listNotesBy', function() {
	return {
		restrict: 'A',
		scope: '@',
		//templateUrl: 'views/note-list-td.html',
		link: function(scope, elem, attrs) {
			console.log(scope, elem);

			var self = this;

			scope.$watch('notes', function(notes) {
				//console.log(notes);
			});

			$(elem).on('click', function(e) {
				console.log('CLICK: ', e, $(this), scope.notes, attrs);
				//attrs.set('showFormView');
			});
		}
	};
}).

directive('noteFormView', function() {
	return {
		restrict: 'A',
		scope: '=',
		templateUrl: 'views/note-list-td.html',
		link: function(scope, elem, attrs) {
			console.log('NOTEVIEW: ', scope, attrs);
		}
	};
}).

directive('selectNote', function() {
	return {
		restrict: 'A',
		scope: '@',
		link: function(scope, element, attrs) {
			$(element).on('click', function(e) {
				console.log('noteDirective scope: ', scope);

				$(element).siblings().removeClass('selected');
				element.addClass('selected');

				//$location.path(loc);
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

directive('tagit', function() {
	return {
		scope: '=',
		link: function(scope, element, attrs) {
			var tags = '';

			scope.$watch('editedNote', function(note) {
				console.log(note.tags);

				scope.tags = (note.tags || '').replace(/\s+/, '').split(',');
			});

			scope.$watch('tags', function(tagArray) {
				console.log(tagArray);
				console.log('tagit Scope: ', scope);

				$(element).tagit({
					tags: tagArray
				});
			});

			$(element).find('input').attr('blurnote', '');
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
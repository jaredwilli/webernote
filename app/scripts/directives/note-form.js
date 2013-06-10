'use strict';

app.

directive('noteForm', function() {
	return {
		restrict: 'A',
		scope: '=',
		templateUrl: 'views/note-form.html',
		link: function(scope, elem, attrs) {
			//console.log('NoteForm Scope: ', scope);
			//var parent = scope.$parent;
			//console.log('NoteForm Parent: ', parent);

		}
	};
}).

directive('tagit', function() {
	return {
		scope: '=',
		link: function(scope, element, attrs) {
			var tags = '';
			var parent = scope.$parent;
			console.log('tagit', parent);

			/*parent.$watch('editedNote', function(note) {
				console.log(note.tags);

				scope.tags = (note.tags || '').replace(/\s+/, '').split(',');
			});

			scope.$watch('tags', function(tagArray) {
				console.log(tagArray);
				console.log('tagit Scope: ', scope);

				$(element).tagit({
					tags: tagArray
				});
			});*/

		}
	};
}).

directive('noteUpdate', function() {
	return {
		restrict: 'A',
		scope: '=',
		transclude: true,
		link: function(scope, element, attrs) {
			//console.log('noteUpdate: ', scope);

			$(element).on('blur change', function(e) {
				//console.log('noteUpdate element: ', element);

				// TODO: Fix this crap
				var parent = scope.$parent.$parent.$parent.$parent;
				//console.log('noteUpdate: ', parent);
				parent.editNote(scope.editedNote);

				//scope.$apply(scope.editedNote);
			});

		}
	};
});

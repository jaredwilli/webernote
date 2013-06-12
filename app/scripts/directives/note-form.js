'use strict';

app.

directive('noteForm', function() {
	return {
		restrict: 'A',
		scope: '@',
		transclude: true,
		templateUrl: 'views/note-form.html',
		link: function(scope, elem, attrs) {
			parent = scope.$parent.$parent;

			console.log('NoteForm Scope: ', parent);

			parent.$watch('editedNote', function(editedNote) {
				console.log(editedNote.$id);

				scope.tags = editedNote.tags;
				console.log('tags: ', editedNote.tags, parent.tags);
				$('.tag').select2({
					tags: scope.tags,
					placeholder: 'Add tags'
				});

			});

		}
	};
}).

directive('noteUpdate', function() {
	return {
		restrict: 'A',
		scope: '@',
		transclude: true,
		link: function(scope, element, attrs) {
			//console.log('noteUpdate: ', scope);

			$(element).on('blur change keyup', function(e) {
				//console.log('noteUpdate element: ', element);

				// TODO: Fix this crap
				var parent = scope.$parent;
				//console.log('noteUpdate: ', parent);
				parent.editNote(scope.editedNote);

				//scope.$apply(scope.editedNote);
			});

		}
	};
});

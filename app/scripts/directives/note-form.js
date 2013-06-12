'use strict';

app.

directive('noteForm', function() {
	return {
		restrict: 'A',
		scope: '@',
		templateUrl: 'views/note-form.html',
		link: function(scope, elem, attrs) {
			console.log('NoteForm Scope: ', scope);
			parent = scope.$parent.$parent;


			parent.$watch('editedNote', function(editedNote) {
				scope.tags = editedNote.tags.replace(', ', ',').split(',');
				console.log(scope.tags);

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
				console.log('noteUpdate: ', parent);
				parent.editNote(scope.editedNote);

				//scope.$apply(scope.editedNote);
			});

		}
	};
});

'use strict';

app.

directive('noteForm', function() {
	return {
		restrict: 'A',
		scope: '=',
		templateUrl: 'views/note-form.html',
		link: function(scope, elem, attrs) {
			console.log('NOTEVIEW: ', scope, attrs);
		}
	};
}).

directive('tagit', function() {
	return {
		scope: '=',
		link: function(scope, element, attrs) {
			var tags = '';
			var parent = scope.$parent;
			console.log(parent);

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
});


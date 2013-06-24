'use strict';

app.

directive('noteForm', function() {
	return {
		restrict: 'A',
		// scope: false,
		// transclude: true,
		templateUrl: 'views/note-form.html',
		// link: function(scope, elem, attrs) {
		// 	var selectTags = [];

		// 	scope.$watch('editedNote.tags', function(tags) {
		// 		//console.log(editedNote.$id);
		// 		if (tags) {
		// 			tags = (tags || '').split(', ');
		// 			//scope.notebooks = parent.notebooks;
		// 			//editedNote.tags = editedNote.tags;

		// 			console.log('tags: ', tags);
		// 			console.log('NoteForm Scope: ', scope.tags);
		// 			var tagObj;
		// 			for (var i = 0; i < tags.length; i++) {
		// 				var tag = tags[i];
		// 				for (var j = 0; j < scope.tags.length; j++) {
		// 					if (tag === scope.tags[j].text) {
		// 						console.log('tagsj', scope.tags[j]);
		// 						tagObj = {
		// 							id: scope.tags[j].$id,
		// 							text: scope.tags[j].text
		// 						};
		// 						selectTags.push(tagObj);
		// 					}
		// 				}
		// 			}
		// 			scope.tags = selectTags;
		// 			console.log(scope.tags);

		// 			// $('.tag').select2({
		// 			// 	tags: editedNote.tags,
		// 			// 	placeholder: 'Add tags'
		// 			// });
		// 		}
		// 	});

		// }
	};
}).

directive('noteUpdate', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			console.log('noteUpdate: ', scope);

			$(element).on('blur change keyup', function(e) {
				//console.log('noteUpdate element: ', element);

				// TODO: Fix this crap
				//var parent = scope.$parent;
				//console.log('noteUpdate: ', parent);
				// parent.editNote(scope.editedNote);

				//scope.$apply(scope.editedNote);
			});

		}
	};
});

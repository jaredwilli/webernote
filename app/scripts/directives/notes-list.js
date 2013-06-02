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

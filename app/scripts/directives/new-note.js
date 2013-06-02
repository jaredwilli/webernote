'use strict';

app.

directive('newnote', function() {
	return {
		//template: '<a id="{{ logg.name | lowercase }}" href="" ng-click="{{logg.action}}">{{ logg.name }}</a>',
		link: function(scope, element, attrs) {
			console.log(element.addClass('test'));

			scope.newNote = function() {
				console.log('newNote', this);
			};
		}
	};
});

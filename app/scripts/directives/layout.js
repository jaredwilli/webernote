'use strict';

angular.module('angApp').

directive('resizable', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).colResizable({
				minWidth: 60,
				liveDrag: true,
				draggingClass: 'dragging'/*,
				onResize: function(e) {
					var columns = $(e.currentTarget).find('th, td');
				}*/
			});
		}
	};
}).

directive('fullheight', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var el = $(element),
				tdHeight = window.innerHeight - el.find('td').position().top - 20,
				noteNavLinks = el.find('#note-nav li a'),
				desc = el.find('#notes .description');

			// Fix column heights
			el.find('td').height(tdHeight);
			el.find('#note-nav, #note-list, #show-note').height(tdHeight - 10);
			el.find('form').height(tdHeight - 23);
		}
	};
});

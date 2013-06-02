'use strict';

angular.module('angApp').

directive('resizable', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).colResizable({
				minWidth: 60,
				liveDrag: true,
				draggingClass: 'dragging',
				onResize: function(e) {
					var columns = $(e.currentTarget).find('th, td');
				}
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

			// Fix left nav arrows so they work right when empty
			for (var i = 0; i < noteNavLinks.length; i++) {
				var noteNavLink = noteNavLinks[i];
				if ($(noteNavLink).siblings('ul').length === 0) {
					$(noteNavLink).css({
						background: 'none',
						padding: 0
					});
				}
			}

			// Expand / contract note nav
			el.find('#note-nav a').on('click', function(e) {
				e.preventDefault();

				if ($(this).parent().hasClass('expanded')) {
					$(this).parent().removeClass('expanded');
					$(this).siblings('ul').addClass('hidden');
				} else {
					$(this).parent().addClass('expanded');
					$(this).siblings('ul').removeClass('hidden');
				}

				// TODO: generate these nav sections from the given data of each note
			});
		}
	};
});

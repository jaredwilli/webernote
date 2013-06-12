'use strict';

angular.module('angApp').

directive('navToggler', function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var parent = scope.$parent,
				el = $(elem),
				noteNavLinks = el.find('#note-nav li a');

			/*parent.$watch('notebooks+tags', function(notebooks, tags) {
				if (notebooks)
				if (tags) {
					console.log($(elem).parent());
					console.log(attrs);
				}
			});*/

			//Fix left nav arrows so they work right when empty
			for (var i = 0; i < noteNavLinks.length; i++) {
				var noteNavLink = $(noteNavLinks[i]);

				if (noteNavLink.siblings('ul').length === 0) {
					noteNavLink.css({
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
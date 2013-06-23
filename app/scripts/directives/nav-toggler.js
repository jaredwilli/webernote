'use strict';

angular.module('angApp').

directive('navToggler', function() {
	return {
		restrict: 'A',
		// transclude: true,
		// scope: '=',
		link: function(scope, elem, attrs) {
			var parent = scope.$parent,
				noteNavLinks = $('#note-nav li a');

			parent.$watch('tags', function(tags) {
				if (tags) {
					//console.log('TAGS: ', parent, tags);
					$('#tags li:first').addClass('expanded');
				}
			});

			scope.$watch('notebooks', function(notebooks) {
				if (notebooks) {
					//console.log('NOTEBOOKS: ', parent, notebooks);
					$('#notebooks li:first').addClass('expanded');
				}
			});

			// Expand / contract noteNav
			// noteNavLinks.on('click', function(e) {
			// 	e.preventDefault();

			// 	if ($(this).parent().hasClass('expanded')) {
			// 		$(this).parent().removeClass('expanded');
			// 		$(this).siblings('ul').addClass('hidden');
			// 	} else {
			// 		$(this).parent().addClass('expanded');
			// 		$(this).siblings('ul').removeClass('hidden');
			// 	}

			// 	// TODO: generate these nav sections from the given data of each note
			// });
		}
	};
});
'use strict';

angular.module('angApp').

directive('blurnote', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('blur', function() {
				scope.editedNote.modified = new Date().getTime();
				scope.editNote(scope.editedNote);

				console.log(scope.editedNote);
            });
        }
    };
}).

directive('selectnote', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).on('click', function(e) {
				$(element).siblings().removeClass('selected');
				$(this).addClass('selected');
			});
		}
	};
}).

/*directive('loginout', function() {
	return {
		restrict: 'E',
		template: '<a id="logout" href="" ng-click="logout()" loginout>Logout</a>',
		link: function(scope, element, attrs) {
			console.log(scope);

		}
	};
}).
*/

directive('tagit', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).select2({
            	tags: ''
        	});
        }
    };
});
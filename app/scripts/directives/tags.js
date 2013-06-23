'use strict';

angular.module('angApp').


directive('tagit', function() {
    return {
    	// scope: '=',
        link: function(scope, element, attrs) {
        	console.log('tagitscope: ', scope);

			/*$(element).tagit({
				tags: '',
				placeholderText: '',
				availableTags: [],
				tabIndex: null,

	            beforeTagAdded: function() {
	            	console.log('before tag added');
	            },
	            afterTagAdded: function() {
	            	console.log('tag added');
	            },

	            beforeTagRemoved: null,
	            afterTagRemoved: null

			});
*/
			$(element).find('input').attr('blurnote', '');
        }
    };
}).

directive('tagList', function() {
	return {
		restrict: 'A',
		transclude: true,
		template: '<li class="tag-item" ng-repeat="tag in note.tags" id="{{ tag.id }}">{{ tag.text }}</li>',
		link: function(scope, element, attrs) {
			console.log('tag-list: ', scope);
		}
	};
});
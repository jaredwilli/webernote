'use strict';

angular.module('angApp').


directive('tagit', function() {
    return {
    	scope: '=',
        link: function($scope, element, attrs) {
        	console.log('tagitscope: ', $scope);

			$(element).tagit({
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

			$(element).find('input').attr('blurnote', '');
        }
    };
}).

directive('taglist', function() {
	return {
		link: function(scope, element, attrs) {
			//$(element).find('.select2-search-choice > div')


			console.log(scope);
		}
	};
});
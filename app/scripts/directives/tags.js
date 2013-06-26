'use strict';

angular.module('angApp').

directive('tagList', function() {
    return {
        restrict: 'A',
        //transclude: true,
        template: '<li class="tag-item" ng-repeat="tag in note.tags" id="{{ tag.id }}">{{ tag.text }}</li>'
    };
}).

directive('noteTags', function() {
    return {
        restrict: 'A',
        scope: true,
        template: '<input type="hidden" ng-model="tags" class="tag input-large" ui-select2="{{ tags }}" />',
        link: function(scope, elem, attrs) {
            var selectTags = [];

            scope.$watch('editedNote', function(editedNote) {
                var allTags = scope.$parent.tags,
                    noteTags = editedNote.tags,
                    tagObj;

                if (noteTags.length > 0 && allTags.length > 0) {
                    console.log('noteTags: ', noteTags);
                    console.log('allTags: ', allTags);

                    for (var i = 0; i < noteTags.length; i++) {
                        var tag = noteTags[i].text.toLowerCase();
                        console.log(tag);

                        for (var j = 0; j < allTags.length; j++) {
                            var allTag = allTags[j].text.toLowerCase();
                            console.log(allTag);

                            if (noteTag === allTag) {
                                tagObj = {
                                    id: noteTags[i].$id,
                                    text: noteTags[i].text
                                };
                                selectTags.push(tagObj);
                            }
                        }
                    }
                    scope.tags = {
                        tags: selectTags
                    };
                    console.log(scope.tags);

                    // $('.tag').select2({
                    // 	tags: editedNote.tags,
                    // 	placeholder: 'Add tags'
                    // });
                }
            });
        }
    };
});

/*directive('tagit', function() {
    return {
    	// scope: '=',
        link: function(scope, element, attrs) {
        	console.log('tagitscope: ', scope);

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
}).*/

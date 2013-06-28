'use strict';

app.

directive('noteTags', function() {
    return {
        restrict: 'A',
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
                        var noteTag = noteTags[i].text.toLowerCase();
                        console.log(noteTag);

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
                }
            });
        }
    };
}).

directive('tagList', function() {
    return {
        restrict: 'A',
        //transclude: true,
        template: '<li class="tag-item" ng-repeat="tag in note.tags" id="{{ tag.id }}">{{ tag.text }}</li>'
    };
});

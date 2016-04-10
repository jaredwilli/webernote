'use strict';

app.

directive('noteTags', function() {
    return {
        restrict: 'A',
        // replace: true,
        scope: true,
        template: '<input type="hidden" class="tag input-large" ui-select2="{{ tags }}" />',
        link: function(scope, elem, attrs) {
            scope.$watch('editedNote', function(editedNote) {
                if (!editedNote) return;

                var allTags = scope.$parent.tags,
                    noteTags = editedNote.tags,
                    tagObj;

                if (noteTags.length > 0 && allTags.length > 0) {
                    console.log('noteTags: ', noteTags);
                    console.log('allTags: ', allTags);
                    var selectTags = [];

                    for (var i = 0; i < noteTags.length; i++) {
                        var noteTag = noteTags[i].text.toLowerCase();

                        for (var j = 0; j < allTags.length; j++) {
                            var allTag = allTags[j].text.toLowerCase();

                            if (noteTag === allTag) {
                                tagObj = {
                                    id: noteTags[i].id,
                                    text: noteTags[i].text
                                };
                                selectTags.push(tagObj);
                            }
                        }
                    }
                    scope.tags = {
                        tags: selectTags
                    };
                    console.log('scope.tags: ', scope, scope.tags);
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

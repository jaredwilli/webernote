'use strict';

app.

directive('noteForm', function() {
    return {
        restrict: 'A',
        templateUrl: 'views/note-form.html',
    };
}).

directive('noteUpdate', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).on('blur change', function(e) {
                scope.editNote(scope.editedNote);
            });
        }
    };
});

'use strict';

app.

directive('noteSelected', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var parent = scope.$parent;

            $(element).on('click', function(e) {
                if ($(e.target).hasClass('delete')) {
                    parent.deleteNote(scope.note);
                } else {
                    $(element).siblings().removeClass('selected');
                    element.addClass('selected');
                    scope.editNote(scope.note);
                }
            });
        }
    };
}).

/**
 * Directive for listing notes in center column
 *
 * TODO: This will need to be augmented eventually to allow for listing
 * notes by tags and notebooks via routes through sidenav
 */
directive('listNotesBy', function() {
    return {
        restrict: 'A',
        scope: false,
        templateUrl: 'views/note-list-td.html'
    };
}).

/**
 * Reverse filter to sort the notes by most recently created date
 */
filter('reverse', function() {
    return function(notes) {
        return notes.slice().reverse();
    };
});

'use strict';

app.

directive('listNotesBy', function() {
    return {
        restrict: 'A',
        scope: false,
        templateUrl: 'views/note-list-td.html',
        link: function(scope, element, attrs) {
            console.log('listNotesBy scope: ', scope);
        }
    };
}).

directive('noteSelected', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var parent = scope.$parent;
            /*console.log('noteList parent: ', parent);*/

            $(element).on('click', function(e) {
                //console.log(e.target, e.currentTarget);

                if ($(e.target).hasClass('delete')) {
                    console.log(scope);
                    parent.deleteNote(scope.note);

                } else {
                    $(element).siblings().removeClass('selected');
                    element.addClass('selected');

                    //scope.editedNote = scope.note;
                    console.log('noteSelected note: ', scope.note);
                    scope.editNote(scope.note);
                }
            });
        }
    };
}).

filter('reverse', function() {
    return function(notes) {
        return notes.slice().reverse();
    };
});

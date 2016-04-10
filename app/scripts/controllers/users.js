'use strict';

app.

controller('UserCtrl', [
    '$scope',
    '$location',
    'noteFactory',
    'notebookFactory',
    'tagFactory',

    function UserCtrl($scope, $location, noteFactory, notebookFactory, tagFactory) {

        //console.log($scope.$parent.user);
        $scope.$parent.$watch('userId', function(userId) {
            //console.log('$watch.userId: ', userId);
            $scope.userId = userId;

            $scope.notes = noteFactory.getAllNotes($scope.userId + '/notes');
            $scope.notebooks = notebookFactory.getAllNotebooks($scope.userId + '/notebooks');
            $scope.tags = tagFactory.getAllTags($scope.userId + '/tags');

            //console.log($scope.notes);
            //console.log('TAGS: ', $scope.tags);
        });

        // Notes
        $scope.addNote = function() {
            var note = noteFactory.addNote($scope.userId + '/notes');
            $scope.editNote(note);
        };
        $scope.editNote = function(note) {
            $scope.editedNote = note || {};
            noteFactory.editNote($scope.userId + '/notes', note);
        };
        $scope.deleteNote = function(note) {
            // TODO: create a dialog to confirm deletion of note
            noteFactory.deleteNote($scope.userId + '/notes', note);
        };

    }
]);

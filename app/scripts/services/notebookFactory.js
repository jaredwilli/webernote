'use strict';

angular.module('angApp').

/**
 * Notebooks Factory for adding/editing/removing notebooks of notes
 */

factory('notebookFactory', [
    'angularFireCollection',
    function notebookFactory(angularFireCollection) {
        var baseUrl = 'https://webernote.firebaseio.com/users/';

        return {
            getAllNotebooks: function(path) {
                return angularFireCollection(baseUrl + '/' + path);
            },
            getNotebook: function(path, notebook) {
                return angularFireCollection(baseUrl + '/' + path + '/' + notebook);
            },
            addNotebook: function(path, notebook) {
                console.log(this.getAllNotebooks(path));

                this.getAllNotebooks(path).add(notebook, function(snap) {
                    console.log('notebook added:', snap);
                });
            },
            editNotebook: function(path, notebook) {
                this.getAllNotebooks(path).update(notebook);
            },
            deleteNotebook: function(path, notebook) {
                console.log(this.getAllNotebooks(path), path, notebook);
                this.getAllNotebooks(path).remove(notebook);
            }
        };
    }
]);

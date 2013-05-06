'use strict';

angular.module('angApp').

factory('fireFactory', [
	function fireFactory() {
		return {
			firebaseRef: function(path) {
				var baseUrl = 'https://webernote.firebaseio.com';
				path = (path !=='') ?  baseUrl + '/' + path : baseUrl;
				return new Firebase(path);
			}
		};
	}
]).

factory('noteFactory', [
	'angularFireCollection',
	function noteFactory(angularFireCollection) {
		var baseUrl = 'https://webernote.firebaseio.com/users/';

		return {
			getAllNotes: function(path) {
				//console.log(baseUrl + '/' + path);
				var ref = angularFireCollection(baseUrl + '/' + path);

				return ref;
			},
			getNote: function(path, note) {
				var ref = angularFireCollection(baseUrl + '/' + path + '/' + note);
				return ref;
			},
			addNote: function(path) {
				console.log(this.getAllNotes(path));
				var note = {
					title: 'Untitled note...',
					notebook: 'My Notebook',
					url: '',
					tags: '',
					description: '',
					modified: new Date().getTime(),
					created: new Date().getTime()
				};

				this.getAllNotes(path).add(note, function(snap) {
					console.log('note added', snap);
				});
			},
			editNote: function(path, note) {
				this.getAllNotes(path).update(note);
			},
			deleteNote: function(path, note) {
				console.log(path, note);
				this.getAllNotes(path).remove(note);
			}
		};
	}
]);
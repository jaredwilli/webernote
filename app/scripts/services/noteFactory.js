'use strict';

angular.module('angApp').

factory('noteFactory', [
	'angularFireCollection',

	function noteFactory(angularFireCollection) {
		var url = 'https://jaredwilli.firebaseio.com/';

		return {
			addNote: function() {
				this.getAllNotes('notes').add({
					title: 'Untitled note...',
					notebook: 'My Notebook',
					url: '',
					tags: '',
					description: '',
					modified: new Date().getTime(),
					created: new Date().getTime()
				}, function(snap) {
					console.log('note added');
				});
			},
			getAllNotes: function(path) {
				var ref = angularFireCollection(url + '/' + path);
				return ref;
			},
			getNote: function(note) {
				var ref = angularFireCollection(url + '/notes/' + note);
				return ref;
			},
			editNote: function(note) {
				this.getAllNotes('notes').update(note);
			},
			deleteNote: function(note) {
				console.log(this.getAllNotes('notes'));
				this.getAllNotes('notes').remove(note);
			}
		};
	}
]);
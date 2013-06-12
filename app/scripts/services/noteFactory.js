'use strict';

app.

/**
 * Note Factory for adding/editing/removing notes
 */

factory('noteFactory', [
	'angularFireCollection',
	function noteFactory(angularFireCollection) {
		var baseUrl = 'https://webernote.firebaseio.com/users/';

		return {
			getAllNotes: function(path) {
				return angularFireCollection(baseUrl + '/' + path);
			},
			getNote: function(path, note) {
				return angularFireCollection(baseUrl + '/' + path + '/' + note);
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
					//console.log('note added', snap);
				});
			},
			editNote: function(path, note) {
				//console.log(note);
				if (note === null) { return; }

				this.getAllNotes(path).update(note);
			},
			deleteNote: function(path, note) {
				//console.log(this.getAllNotes(path), path, note);
				//console.log(note);
				this.getAllNotes(path).remove(note);
			}
		};
	}
]);
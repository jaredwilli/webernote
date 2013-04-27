function Webernote(firebase) {
	this.firebase = firebase;

	return this;
}
Webernote.prototype = {
	tags: new Firebase('https://webernote.firebaseio.com/tags/'),
	users: new Firebase('https://webernote.firebaseio.com/users/'),
	notes: new Firebase('https://webernote.firebaseio.com/notes/'),
	notebooks: new Firebase('https://webernote.firebaseio.com/notebooks/'),
	note: [],

	// Setup the storage, forest!
	noteExists: function() {
		var self = this;

		self.notes.on('child_added', function(snapshot) {
			//console.log(snapshot.name());

			return (function(snapshot) {
				notes.push(snapshot.name());

				var noteData = snapshot.val(),
					createdDate = self.formatDate(noteData.created),
					modifiedDate = self.formatDate(noteData.modified),
					noteTitle = (noteData.title !== '') ? noteData.title : 'Untitled note...';

				var noteStr = '<li id="note-'+ snapshot.name() +'"><a class="delete" href="#">X</a>'+
					'<h2 class="title">'+ noteTitle +'</h2>'+
					'<p><span class="date">'+ createdDate +'</span>'+
					'<span class="tags">'+ noteData.tags +'</span>'+
					'<span class="description">'+ noteData.description +'</span></p></li>';

				$('#notes').find('ul').prepend(noteStr);
			})(snapshot);
		});

		self.notes.on('child_removed', function(name) {
			return function(snapshot) {
				$('#note-'+ snapshot.name()).remove();
		    }
		})(snapshot);

		// Setup additions to the todo lists. We read from the #username field - this
		// allows us to spoof the 'from' to test the validation rules for Alice and
		// Bob and ensure that the rules we've specified are enforced.
		$('#note-' + name + '-add').on('click', function(name){
			return function() {
				var item = {
					from: $('#username').val(),
					todo: $('#' + name + '-todo').val()
				};

				firebaseRef.child(name).push(item);
				$('#' + name + '-todo').val('');
			}
		})(snapshot);

		// Select note
		$('#notes').find('li').click(function(e) {
			e.preventDefault();

			$('#notes').find('li').removeClass('selected');
			$('#'+ noteId).addClass('selected');

			console.log(noteId);
			self.selectNote(noteId);
			//self.updateNote(noteId);
		});
	},

	// New note
	newNote: function() {
		var date = new Date(),
			self = this;

		// self.notes.push(noteId, JSON.stringify(noteData));
		var notesPushRef = self.notes.push();

		notesPushRef.set({
			title: 'Untitled note...',
			notebook: 'My Notebook',
			url: '',
			tags: '',
			description: '',
			created: date.getTime(),
			modified: date.getTime()
		});

		//$('#notes').find('li').removeClass('selected');
		//$('#notes').find('li[id=' + noteId + ']').addClass('selected');

		//self.selectNote(
	},

	// Get note
	getNote: function(noteId) {
		var note, self = this;

		//console.log(typeof noteId);
		self.notes.child(noteId).on('value', function(snapshot) {
			note = snapshot.val();
		});

		return note;
	},

	// Update note
	updateNote: function(noteId) {
		var noteForm = $('#show-note').find('form'),
			noteList = $('#notes').find('ul'),
			self = this;

		var noteData = self.getNote(noteId),
			date = new Date();

		// Title
		noteForm.find('.title').on('keyup', function(e) {
			noteData.title = $(this).val();

			// webernote.setNote(noteId, noteData);
			self.notes.child(noteId).set({
				title: noteData.title,
				modified: new Date().getTime()
			});

			//noteList.find('li[data-note='+ noteId +'] .title').text($(this).val());
		});

		// URL
		noteForm.find('input.url').on('keyup', function(e) {
			var url = /http(s?):\/\//.test($(this).val());
			noteData.url = (url) ? $(this).val() : 'http://' + $(this).val();

			// webernote.setNote(noteId, noteData);
			self.notes.child(noteId).update({
				url: noteData.url,
				modified: new Date().getTime()
			});

			//noteList.find('li[data-note='+ noteId +'] .url').text($(this).val());
		});

		// Tags
		noteForm.find('input.tag').on('keyup', function(e) {
			noteData.tags = $(this).val();

			//webernote.setNote(noteId, noteData);
			self.notes.child(noteId).update({
				tags: noteData.tags,
				modified: new Date().getTime()
			});

			//noteList.find('li[data-note='+ noteId +'] .tags').text($(this).val());
		});

		// On blur: split up each tag and check if they already exist
		// add the tags as the uniques which have the note IDs for the notes that have the tags
		// if a tag exists write to that tag the new note ID containing the tag
		// otherwise add the new tag and write to it the note ID
		noteForm.find('input.tag').blur(function(e) {
			var tagsData = ($(this).val() || '').split(', ');
			console.log(tagsData);

			self.tags.child(noteId).update({
				tags: noteData.tags,
				modified: new Date().getTime()
			});
		});

		// Description
		// TODO: replace this with a wyswyg editor
		noteForm.find('div.description').on('click', function(e) {
			var desc = $(this).html();

			$(this).addClass('hidden');
			$(this).next().html(desc).removeClass('hidden');
		});
		noteForm.find('textarea.description').on('keyup', function(e) {
			noteData.description = $(this).val();

			//webernote.setNote(noteId, noteData);
			self.notes.child(noteId).update({
				description: noteData.description,
				modified: new Date().getTime()
			});

			//noteList.find('li[data-note='+ noteId +'] .description').html($(this).val());
		});
		noteForm.find('textarea.description').blur(function(e) {
			var desc = $(this).val();

			$(this).addClass('hidden');
			$(this).prev().html(desc).removeClass('hidden');
		});
	},

	// Delete note
	deleteNote: function(noteId) {
		if (noteId === null) return;

		this.notes(noteId);
	},

	noteClick: function(e) {
		var self = this;

		if ($(e.target).hasClass('delete')) {
			$(e.target).parent().remove();

			self.deleteNote($(e.target).parent().attr('id'));
			return false;
		}

		$('#notes').find('li').removeClass('selected');
		$(this).addClass('selected');

		self.showNote(noteId);
		self.updateNote(noteId);
	},

	// Show note
	selectNote: function(noteId) {
		if (noteId === null) return;

		var showNote = $('#show-note'),
			noteStr = $('._noted').clone(),
			self = this;

		// Column 3
		var noteData = self.getNote(noteId);
		//console.log(noteData);

		//console.log(noteData);
		noteStr.attr('data-note', noteId).removeAttr('class');

		noteStr.find('.title').val(noteData.title);
		noteStr.find('.url').val(noteData.url);
		noteStr.find('.tag').val(noteData.tags);
		noteStr.find('.description').html(noteData.description);

		showNote.html(noteStr);
		//.find('textarea').focus();
		// Run updater for note form
		self.updateNote(noteId);
	},

	// Set tag
	setTag: function(noteId, tagId) {
		this.tags.set(noteId, JSON.stringify(tagId));
		this.getTag(tagId);
	},

	// Get tag
	getTag: function(tagId) {
		var tag;
		console.log(tagId);

		webernote.tags.child(tagId).on('value', function(snapshot) {
			tag = snapshot.val();
		});

		return tag;
	},
};

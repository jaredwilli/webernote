bmi_SafeAddOnload = null;

if (typeof webernote !== 'object') {
	webernote = {};
}

webernote = {
	notes: {},
	store: null,

	common: {
		init: function() {
			//$.support.cors = true;
			if ('localStorage' in window && window['localStorage'] !== null) {
				webernote.init();
			}
		}
	},
	init: function() {
		// Fix heights
		var tdH = window.innerHeight- $('td').position().top - 20;
		$('td').height(tdH);
		$('#note-nav, #note-list, #show-note').height(tdH - 10);

		// Make columns resizable
		$('#resizable').colResizable({
			minWidth: 60,
			liveDrag: true,
			draggingClass: 'dragging',
			onResize: function(e) {
				var columns = $(e.currentTarget).find('th, td');
			}
		});

		// Fix nav arrows
		var noteA = $('#note-nav li').find('a');
		for (var i = 0; i < noteA.length; i++) {
			if ($(noteA[i]).siblings('ul').length === 0) {
				$(noteA[i]).css({ background: 'none', padding: 0 });
			}
		}

		$('#toolbar').find('a').on('click', function(e) {
			e.preventDefault();
		});

		// expand / contract note nav
		$('#note-nav').find('a').on('click', function(e) {
			e.preventDefault();

			if ($(this).parent().hasClass('expanded')) {
				$(this).parent().removeClass('expanded');

				$(this).siblings('ul').addClass('hidden');
			}
			else {
				$(this).parent().addClass('expanded');
				$(this).siblings('ul').removeClass('hidden');
			}

			// TODO: generate these nav sections from the given data of each note
		});


		// Trim fat
		webernote.trim();

		webernote.store = window.localStorage;
		var num = webernote.store.length;
		if (num > 0) {
			for (var j = 0; j < num; j++) {
				webernote.showNoteList('note' + j);
				$('#note-list').find('.count').text(j + 1);
			}
		}
		//console.log(notes, webernote.store);

		// Create a new note
		$('#new').on('click', function(e) {
			e.preventDefault();

			webernote.newNote(num);
			webernote.updateNote(num);
		});

		// On note click
		$('li', '#notes').on('click', function(e) {
			e.preventDefault();

			var noteId = $(this).data('note');
			$('#notes').find('li').removeClass('selected');
			$(this).addClass('selected');

			webernote.showNote(noteId);
			webernote.updateNote(noteId);
		});

	}, // init

	// New note
	newNote: function(num) {
		// TODO: Make this just add a new default note obj to the global webernote.notes obj
		var noteObj = webernote.dataObj.newNoteObj(num),
			noteId = 'note' + num;

		webernote.notes[noteId] = noteObj;

		webernote.setNote(noteId);
		webernote.showNoteList(noteId); // Show list item
		webernote.showNote(noteId); // Show note form

		$('li', '#notes').removeClass('selected');
		$('#notes li').attr('data-note', noteId).addClass('selected');
	},

	// Set note
	setNote: function(noteId) {
		if (noteId === null) return;
		var	noteData = webernote.notes[noteId];

		webernote.store.setItem(noteId, JSON.stringify(noteData));
		webernote.getNote(noteId);
	},
	// Get note
	getNote: function(noteId) {
		var noteObj = webernote.store.getItem(noteId);
		noteObj = JSON.parse(noteObj);

		webernote.notes[noteId] = noteObj;
		return noteObj;
	},
	// Update note
	updateNote: function(noteId) {
		var noteForm = $('form', '#show-note'),
			noteList = $('ul', '#notes');

		// Title
		noteForm.find('.title').on('keyup', function(e) {
			var noteId = $(this).parents('form').attr('data-note'),
				noteObj = webernote.getNote(noteId);

			noteObj.title = $(this).val();
			webernote.setNote(noteId, JSON.stringify(noteObj));

			noteList.find('li[data-note='+ noteId +']').find('.title').text($(this).val());
		});

		// Tag
		noteForm.find('input.tag').blur(function(e) {
			var tag = $(this).val();

		});

		// Description
		// TODO: replace this with a wyswyg editor
		noteForm.find('div.description').on('click', function(e) {
			var desc = $(this).html();
			$(this).addClass('hidden');
			$(this).next().html(desc).removeClass('hidden');
		});
		noteForm.find('textarea.description').on('keyup', function(e) {
			$(this).html()
		});
		noteForm.find('textarea.description').on('blur', function(e) {
			var desc = $(this).val();
			$(this).addClass('hidden');
			$(this).prev().html(desc).removeClass('hidden');
		});
	},

	// Show note
	showNote: function(noteId) {
		if (noteId === null) return;

		var showNote = $('#show-note'),
			noteStr = $('._noted').clone();

		// Column 3
		var note = webernote.getNote(noteId),
			noteObj = webernote.dataObj.noteObj(note);
		console.log(noteObj);

		noteStr.attr('data-note', noteObj.selector).removeAttr('class');
		noteStr.find('.title').val(noteObj.title);

		noteStr.find('.url').val(noteObj.url);

		noteStr.find('.tags').val(noteObj.tags); // TODO: Show tags if any were added only
		noteStr.find('.description').html(noteObj.description);

		showNote.html(noteStr).find('textarea').focus();

		// Run updater for note form
		webernote.updateNote(noteId);
	},

	// Show list
	showNoteList: function(noteId) {
		if (noteId === null) return;

		var noteList = $('ul', '#notes'),
			noteStr = $('._note').clone();

		// Column 2
		var note = webernote.getNote(noteId),
			noteObj = webernote.dataObj.noteObj(note);
		console.log(noteObj);

		noteStr.attr('data-note', noteObj.selector).removeAttr('class');

		if (noteObj.title === '') {
			noteObj.title = 'Untitled note...';
		}
		noteStr.find('.title').text(noteObj.title);

		noteStr.find('.date').text(noteObj.created); // TODO: Parse this timestamp as readable date
		noteStr.find('.tags').text(noteObj.tags); // TODO: Show tags if any were added only
		noteStr.find('.description').text(noteObj.description);

		noteList.prepend(noteStr);
	},

	dataObj: {
		newNoteObj: function(num) {
			if (typeof num === 'undefined') return;
			var date = new Date();

			return {
				id: num,
				selector: 'note' + num,
				notebook: 'My Notebook',
				title: '',
				url: '',
				tags: '',
				description: '',
				created: date.getTime(),
				modified: date.getTime()
			};
		},
		noteObj: function(note) {
			if (typeof note === 'undefined') return;
			var date = new Date();

			// Make fallback values if there are none
			return {
				id: note.id,
				selector: note.selector || 'note' + note.id,
				notebook: note.notebook || 'My Notebook',
				title: note.title || '',
				url: note.url || '',
				tags: note.tags || '',
				description: note.description || '',
				created: note.created || date.getTime(),
				modified: note.modified || date.getTime()
			};
		}
	},
	trim: function() {
		var desc = $('#notes').find('.description');

		for (var i = 0; i < desc.length; i++) {
			$(desc[i]).addClass('ellipses').addClass('multiline');
		}
		$('.ellipsis').ellipsis();
	},

	utils: {
		extend: function(d, e, c) {
			var b = function() {}, a;
			b.prototype = e.prototype;
			d.prototype = new b();
			d.prototype.constructor = d;
			d.superclass = e.prototype;
			if (e.prototype.constructor == Object.prototype.constructor) {
				e.prototype.constructor = e;
			}
			if (c) {
				for (a in c) {
					if (c.hasOwnPropterty(a)) {
						d.prototype[a] = c[a];
					}
				}
			}
		},
		isArray: function(array) {
			return (array.constructor.toString().indexOf('Array') !== -1);
		},
		randomKey: function(array) {
			return array[Math.floor(Math.random() * array.length)];
		},
		keyExists: function(key, search) {
			if (!search || (search.constructor !== Array && search.constructor !== Object)) { return false; }
			for (var i = 0; i < search.length; i++) {
				if (search[i] === key) { return true; }
			}
			return key in search;
		},
		createCache: function(requestFunction) {
			var cache = {};
			return function(key, callback) {
				if (!cache[key]) {
					cache[key] = $.Deferred(function(defer) {
						requestFunction(defer, key);
					}).promise();
				}
				return cache[key].done(callback);
			};
		}
	}
};

UTIL = {
	fire: function(func, funcname, args) {
		var namespace = webernote;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {
		var b = document.body;
		var bid = b.id;
		//console.log(bid);
		UTIL.fire('common');
		UTIL.fire(bid);
/*
		var classes = b.clasaname.split(/\s+/), test = classes.length;
		for (var i = 0; i < test; i++) {
			UTIL.fire(classes[i]);
			UTIL.fire(classes[i], bid);
		};
*/
		UTIL.fire('common', 'finalize');
	}
};
//kick it all off here
$(document).ready(UTIL.loadEvents);
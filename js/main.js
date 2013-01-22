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
		/**
		 * Fix heights first
		 */
		var tdH = window.innerHeight- $('td').position().top - 20;
		$('td').height(tdH);
		$('#note-nav, #note-list, #show-note').height(tdH - 10);

		/**
		 * Make columns resizable
		 */
		$('#resizable').colResizable({
			minWidth: 60,
			liveDrag: true,
			draggingClass: 'dragging',
			onResize: function(e) {
				var columns = $(e.currentTarget).find('th, td');
			}
		});

		/**
		 * Unused toolbar nav idk what to do with yet
		 */
		$('#toolbar').find('a').on('click', function(e) {
			e.preventDefault();
		});

		/**
		 * Fix left nav arrows so they work right
		 */
		var noteA = $('#note-nav li').find('a');
		for (var i = 0; i < noteA.length; i++) {
			if ($(noteA[i]).siblings('ul').length === 0) {
				$(noteA[i]).css({ background: 'none', padding: 0 });
			}
		}

		/**
		 * Expand / contract note nav
		 */
		$('#note-nav').find('a').on('click', function(e) {
			e.preventDefault();

			if ($(this).parent().hasClass('expanded')) {
				$(this).parent().removeClass('expanded');
				$(this).siblings('ul').addClass('hidden');
			} else {
				$(this).parent().addClass('expanded');
				$(this).siblings('ul').removeClass('hidden');
			}

			// TODO: generate these nav sections from the given data of each note
		});

		// Trim fat
		webernote.trim();

		/**
		 * Setup the storage, forest!
		 */
		webernote.store = window.localStorage;
		var num = webernote.store.length;
		if (num > 0) {
			var total;
			for (var j = 0; j < num; j++) {
				webernote.showNoteList('note' + j);
				total = j + 1;
			}
			$('#note-list').find('.count').text(total);
			$('#all').find('.count').text('('+ total +')');
		}
		//console.log(notes, webernote.store);

		/**
		 * Create a new note
		 */
		$('#new').on('click', function(e) {
			e.preventDefault();

			webernote.newNote(num);
			webernote.updateNote(num);
		});

		/**
		 * On note click
		 */
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

		webernote.setNote(noteId, noteObj);
		webernote.showNoteList(noteId); // Show list item
		webernote.showNote(noteId); // Show note form

		$('#notes').find('li').removeClass('selected');
		$('#notes').find('li[data-note='+ noteId +']').addClass('selected');
	},

	// Set note
	setNote: function(noteId, noteObj) {
		if (noteId === null) return;

		webernote.store.setItem(noteId, JSON.stringify(noteObj));
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
		var noteForm = $('#show-note').find('form'),
			noteList = $('#notes').find('ul');
		var noteObj = webernote.getNote(noteId);

		// Title
		noteForm.find('.title').on('keyup', function(e) {
			noteObj.title = $(this).val();
			webernote.setNote(noteId, noteObj);
			noteList.find('li[data-note='+ noteId +'] .title').text($(this).val());
		});

		// URL
		noteForm.find('input.url').on('keyup', function(e) {
			var url = /http(s?):\/\//.test($(this).val());
			noteObj.url = (url) ? $(this).val() : 'http://' + $(this).val();
			webernote.setNote(noteId, noteObj);
			noteList.find('li[data-note='+ noteId +'] .url').text($(this).val());
		});

		// Tags
		noteForm.find('input.tag').on('keyup', function(e) {
			var tagsObj = ($(this).val() || '').split(', ');
			noteObj.tags = $(this).val();
			webernote.setNote(noteId, noteObj);
			noteList.find('li[data-note='+ noteId +'] .tags').text($(this).val());
		});

		// Description
		// TODO: replace this with a wyswyg editor
		noteForm.find('div.description').on('click', function(e) {
			var desc = $(this).html();
			$(this).addClass('hidden');
			$(this).next().html(desc).removeClass('hidden');
		});
		noteForm.find('textarea.description').on('keyup', function(e) {
			noteObj.description = $(this).val();
			webernote.setNote(noteId, noteObj);
			noteList.find('li[data-note='+ noteId +'] .description').html($(this).val());
		});
		noteForm.find('textarea.description').blur(function(e) {
			var desc = $(this).val();
			$(this).addClass('hidden');
			$(this).prev().html(desc).removeClass('hidden');
		});
	},

/*
		$('#notes li').on('click', function(e) {
			e.preventDefault();
			webernote.noteClick(e);
		});


	}, // end init

	// Set tag
	setTag: function(noteId, tagName) {
		webernote.tag.setItem(noteId, JSON.stringify(tagName));
		webernote.getTag(tagName);
	},
	// Get tag
	getTag: function(tagName) {
		var tagObj = webernote.tag.getItem(tagName);
		tagObj = JSON.parse(tagObj);

		webernote.tags[tagName] = tagObj;
		return tagObj;
	},



	// Delete note
	deleteNote: function(noteId) {
		if (noteId === null) return;

		return webernote.store.removeItem(noteId);
	},
	noteClick: function(e) {
		if ($(e.target).hasClass('delete')) {
			$(e.target).parent().remove();
			webernote.deleteNote($(e.target).parent().data('note'));
			return false;
		}

		var noteId = $(this).data('note');
		$('#notes').find('li').removeClass('selected');
		$(this).addClass('selected');

		webernote.showNote(noteId);
		webernote.updateNote(noteId);
	},




		tagObj: function(noteId, tag) {
			if (typeof tag === 'undefined') return;

			// Make fallback values if there are none
			return {
				id: tag.id,
				name: tag.name || '',
				notes: [ noteId ] || []
			};
		}
*/
	// Show note
	showNote: function(noteId) {
		if (noteId === null) return;

		var showNote = $('#show-note'),
			noteStr = $('._noted').clone();

		// Column 3
		var note = webernote.getNote(noteId),
			noteObj = webernote.dataObj.noteObj(note);
		//console.log(noteObj);

		noteStr.attr('data-note', noteObj.selector).removeAttr('class');

		noteStr.find('.title').val(noteObj.title);
		noteStr.find('.url').val(noteObj.url);
		noteStr.find('.tag').val(noteObj.tags);
		noteStr.find('.description').html(noteObj.description);

		showNote.html(noteStr);
		//.find('textarea').focus();

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
		var noteDate = webernote.utils.formatDate(noteObj.created);
		noteStr.find('.date').text(noteDate); // TODO: Parse this timestamp as readable date
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
		formatDate: function(timeStamp) {
            var date = new Date(timeStamp);
            formattedDate = date.getMonth()+ 1 + "/" + date.getDate() + "/" + date.getFullYear();
            return formattedDate;
        },
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
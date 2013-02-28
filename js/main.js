/**
 * The Webernote object is the primary conduit to the data feed. It provides
 * functions to login a user, log them out, and to register callbacks for
 * events.
 *
 * This object knows nothing about the UI (see WebernoteUI() for
 * how this object is used to make sure the UI is updated as events come in).
 *
 * @param    {string}    baseURL     The Firebase URL.
 *
 * @param    {boolean}   newContext  Whether a new Firebase context is used.
 *                                   (Useful for testing only)
 * @return   {Webernote}
 */

function Webernote(baseUrl, newContext) {
	this.name = null;
	this.userId = null;
	this.firebase = null;
	this.mainUser = null;
	this.fullName = null;

	// Every time we call firebaseRef.on, we need to remember to call .off,
	// when requested by the caller via unload(). Store our handlers
	// here so we can clear them later.
	this.handlers = [];

	if (!baseUrl || typeof baseUrl !== 'string') {
		throw new Error('Invalid baseUrl');
	}
	this.firebase = new Firebase(baseUrl, newContext || false ? new Firebase.Context() : null);
}
Webernote.prototype = {
	validateCallback: function(cb, notInit) {
		if (!cb || typeof cb !== 'function') {
			throw new Error('Invalid onComplete() callback');
		}
		if (!notInit) {
			if (!this.userId || !this.firebase) {
				throw new Error('Method called without calling login()');
			}
		}
	},
	validateObject: function(obj, name) {
		if (!obj || obj.constructor !== Object)	{
			throw new Error('Invalid '+ name +' Object');
		}
	},
	validateString: function(str, name) {
		if (!str || typeof str !== 'string') {
			throw new Error('Invalid '+ name);
		}
	},
	getParameterByName: function(name) {
		var expr = '[?&]'+ name +'=([^&]*)',
			match = RegExp().exec(window.location.search);

		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}
	};

/**
 * Login a given user. The provided callback will be called with (err, info)
 * where "err" will be false if the login succeeded, and "info" is set to
 * an object containing the following fields:
 *
 *    id: userId
 *    name: A string suitable for greeting the user (usually first name)
 *    avatar: URL to a avatar of the user
 *
 * Some methods on this object may not be called until login() has succeeded,
 * and are noted as such.
 *
 * The login is performed using Github or Twitter as the identity provider.
 * A call to login() is done maybe twice in the app:
 * once to check if the user is logged in by passing the silent parameter as
 * true. If they are not, onComplete() will be invoked with an error, you may
 * display a login link and associate the click action for it with another
 * call to login(), this time setting silent to false.
 *
 * @param    {boolean}   silent      Whether or not a silent (no popup)
 *                                   login() should be performed.
 *
 * @param    {Function}  onComplete  The callback to call when login() is done.
 */

Webernote.prototype.login = function(silent, onComplete) {
	var self = this;
	self.validateCallback(onComplete, true);

	var token = localStorage.getItem('authToken');

	if (!token && silent) {
		onComplete(new Error('User is not logged in'), false);
		return;
	}
	else if (token) {
		//console.log(token);
		// reuse the token and auth the Firebase
		self.firebase.auth(token, function(err, dummy) {
			if (!err) {
				//console.log(err);
				finish();
			} else {
				//console.log('clear');
				// clear token and manually login
				localStorage.clear();
				self.login(silent, onComplete);
			}
		});
		return;
	}

	// No token found and silent was false so use github to login
	var authClient = new FirebaseAuthClient(self.firebase, function(err, info) {
		if (err) {
			onComplete(new Error(err), false);
			return;
		}
		else if (info) {
			// Store the token in localStorage
			localStorage.setItem('authToken', info.firebaseAuthToken);
			localStorage.setItem('userId', info.id);
			localStorage.setItem('name', info.name);

			finish();
		}
	});

	// Login with social sites
	authClient.login('Twitter');
	//authClient.login('github');

	function finish() {
		self.userId = localStorage.getItem('userId');
		self.mainUser = self.firebase.child('users').child(self.userId);
		self.name = localStorage.getItem('name');

		var userRef = self.firebase.child('users').child(self.userId);
		//console.log(self, userRef);

		userRef.once('value', function(userSnap) {
			var info = {},
				val = userSnap.val();

			if (!val) {
				// First login set user details
				info = {
					userId: self.userId,
					name: self.name,
					notes: self.userId,
					tags: self.userId,
					notebooks: self.userId
				};
				userRef.set(info);
			} else {
				info = val;
			}

			userRef.child('status').set('online');
			onComplete(false, info);
		});
	}
};


/**
 * Logout the current user. The object may be reused after a logout(), but only
 * after a successful login() has been performed.
 */

Webernote.prototype.logout = function() {
	//console.log(this);
	// reset all keys and user info
	localStorage.clear();

	var userRef = this.firebase.child('users').child(this.userId);
	userRef.child('status').set('offline')
	this.firebase.unauth();
	// reset instance vars
	this.mainUser = null;
	this.userId = null;
	this.name = null;

	$('#loginout').find('a').attr('href', '#login').text('Log In');
	$('.new-note').addClass('hidden');
};

/**
 * Get information on a particular user, given a userId. The onComplete()
 * callback will be provided an object as a single argument, containing
 * the same fields as the object returned by login()
 *
 * You do not need to be authenticated to make this call.
 *
 * onComplete() may be called multiple times if user information changes. Make
 * sure to update the DOM accordingly.
 *
 * @param    {string}    userId      The userId to get information for.
 *
 * @param    {Function}  onComplete  The callback to call with the user info.
 */

Webernote.prototype.getUserInfo = function(userId, onComplete) {
	var self = this;
	self.validateString(userId, 'userId');
	self.validateCallback(onComplete, true);

	var userRef = self.firebase.child('users').child(userId),
		handler = userRef.on('value', function(userSnap) {
			var val = userSnap.val();
			onComplete(val);
		});

	self.handlers.push({
		ref: userRef,
		handler: handler,
		eventType: 'value'
	});
};


/**
 * Get information for a specific note, given a userId and noteId. The
 * onComplete() callback will be provided an object as a single argument,
 * containing the properties in the object returned by onNewNote() with
 * the addition of a created date property.
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {string}    userId          The userId for the current user.
 *
 * @param 	 {string} 	 noteId 		 The noteId of the note to be fetched.
 *
 * @param    {Function}  onComplete  	 The callback to call with the note.
 */

Webernote.prototype.getNote = function(userId, noteId, onComplete) {
	var self = this;
	self.validateString(userId, 'userId');
	self.validateString(noteId, 'noteId');
	self.validateCallback(onComplete, true);

	self.firebase.child('users').child(userId).child('notes').child(noteId).once('value', function(snap) {
		onComplete(snap.val());
	});
};

/**
 * Get the notes within a specific notebook, given a userId and notebookId.
 * The onComplete() callback will be provided an Array as a single argument,
 * containing the ID's of the notes within a notebook.
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {string}    userId          The userId for the current user.
 *
 * @param 	 {string} 	 notebookId		 The ID of the notebook to look in.
 *
 * @param    {Function}  onComplete  	 The callback to call with the note ID's.
 */

Webernote.prototype.getNotebook = function(userId, notebookId, onComplete) {
	var self = this;
	self.validateString(userId, 'userId');
	self.validateCallback(notebookId, 'notebookId');
	self.validateCallback(onComplete, true);

	self.firebase.child('users').child(userId).child('notebooks').child(notebookId).once('value', function(snap) {
		onComplete(snap.val());
	});
};

/**
 * Get the notes with a specific tag, given a userId and tagId. The
 * onComplete() callback will be provided an Array as a single argument,
 * containing the ID's of the notes with that have the tag.
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {string}    userId          The userId for the current user.
 *
 * @param 	 {string} 	 tagId			 The ID of the tag to get notes for.
 *
 * @param    {Function}  onComplete  	 The callback to call with the note ID's.
 */

Webernote.prototype.getTag = function(userId, tagId, onComplete) {
	var self = this;
	self.validateString(userId, 'userId');
	self.validateString(tagId, 'tagId');
	self.validateCallback(onComplete, true);

	self.firebase.child('users').child(userId).child('tags').child(tagId).once('value', function(snap) {
		onComplete(snap.val());
	});
};

/**
 * Save a note as the current user. The provided callback will be called with
 * (err, done) where "err" will be false if the save succeeded, and done will
 * be set to the ID of the note just saved.
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {string}    userId     		The userId for the current user.
 *
 * @param    {Object}    noteData   		A data object for each form field value.
 *
 * @param    {Function}  onComplete  		The callback to call when the save is done.
 */

Webernote.prototype.save = function(userId, noteData, onComplete) {
	var self = this;
	self.validateString(userId, 'userId');
	self.validateObject(noteData, 'noteData');
	self.validateCallback(onComplete, true);

	// Add to the users notes using push() to ensure a unique ID
	var notesRef = self.firebase.child('users').child(userId).child('notes').push(),
		noteRefId = notesRef.name();

	// Set the note
	notesRef.set(noteData, function(err) {
		if (err) {
			onComplete(new Error('Could not save'), false);
			return;
		}

		// Add reference to note just pushed by adding it to notes list of current user
		var listNoteRef = self.mainUser.child('notes').child(noteRefId);
		listNoteRef.set(true, function(err) {
			if (err) {
				onComplete(new Error('Could not save note'), false);
				return;
			}

			// Check the user notebooks if noteData.notebook exists and add it if not. Once the
			// notebook exists add the noteId to the noteData.notebook in notebooks for the user.
			//self.mainUser.child('notebooks').child(noteData.notebook).set(true);

			// Check the user tags for noteData.tags once the string is split(', ') up and add if
			// any tags don't exist. Add the noteId to each tag in the user's tags as a new record.
			//self.mainUser.child('tags').child(noteData.tags).set(true);
		});

		// Done!
		onComplete(false, noteRefId);
	});
};

/**
 * Register a callback to be notified whenever a new note appears on the
 * current user's note list. This is usually triggered by another user saving a
 * note (see Webernote.save()), which will appear in real-time on the current
 * user's notes!
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {Function}  onComplete  The callback to call whenever a new note
 *                                   appears on the current user's note list. The
 *                                   function will be invoked with two arguments:
 *                                   noteId, and an object containing the
 *                                   "author", "by", "pic" and "content"
 *                                   properties.
 */

Webernote.prototype.onNote = function(onComplete) {
	var self = this;

	self.validateCallback(onComplete);

	self.notesRef = self.mainUser.child('notes');
	self.tagsRef = self.mainUser.child('tags');
	self.notebooksRef = self.mainUser.child('notebooks');

	self.notesRef.on('child_added', function(noteSnap) {
		onComplete(noteSnap.name(), noteSnap.val(), noteSnap);
	});
};

Webernote.prototype.onTag = function(tags, noteId, onComplete) {
	var self = this;

	self.validateCallback(onComplete);

	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];

		self.tagsRef.child(tag).child(noteId).set(noteId);
	}

	self.tagsRef.on('child_added', function(tagsSnap) {
		onComplete(tagsSnap.name(), tagsSnap);
	});
};

Webernote.prototype.onNotebook = function(onComplete) {
	var self = this;

	self.validateCallback(onComplete);

	self.notebooksRef = self.mainUser.child('notebooks');
	self.notebooksRef.on('child_added', function(notebookSnap) {
		onComplete(notebookSnap.name(), notebookSnap.val())
	});
};

Webernote.prototype.keyExists = function(key, search) {
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < search.length; i++) {
        if (search[i] === key) {
            return true;
        }
    }
    return key in search;
};

/**
 * Unload all event handlers currently registered. You must call this function
 * when you no longer want to receive updates. This is especially important
 * for single page apps, when transistioning between views. It is safe to
 * reuse the Webernote object after calling this and registering new handlers.
 */

Webernote.prototype.unload = function() {
	for (var i = 0; i < this.handlers.length; i++) {
		var ref = this.handlers[i].ref,
			handler = this.handlers[i].handler,
			eventType = this.handlers[i].eventType;

		ref.off(eventType, handler);
	}
	this.handlers = [];
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function WebernoteUI() {
	this.limit = 150;
	this.loggedIn = false;
	this.webernote = new Webernote('https://webernote.firebaseio.com/');
	this.unload = null;

	// Setup page navigation
	//this.setupHandlers();

	// Setup History listener
	var self = this;
	window.History.Adapter.bind(window, 'statechange', function() {
		self.pageController(window.History.getState().hash, false);
	});

	// Check if user logged in or not with silent login
	self.login(function(info) {
		//console.log(info);

		self.loggedIn = info;
		self.pageController(window.History.getState().hash);
	});
}

WebernoteUI.prototype.setupHandlers = function() {
	var self = this;

	/* Profile */
	$('.profile a').on('click', function(e) {
		e.preventDefault();
		self.goProfile($(this).attr('href'));
	});

	/* Left Navigation links */
	/*$('.notebooks a').on('click', function(e) {
		e.preventDefault();
		self.goShowNotebooks($(this).attr('href'));
	});*/
	/*$('.tags a').on('click', function(e) {
		e.preventDefault();
		self.goShowTags($(this).attr('href'));
	});*/
	/*$('.attributes a').on('click', function(e) {
		e.preventDefault();
		self.goShowAttributes($(this).attr('href'));
	});*/
};

WebernoteUI.prototype.pageController = function(url) {
	// Extract any sub page from url
	var idx = url.indexOf('?'),
		hash = (idx > 0) ? url.slice(idx + 1) : '',
		value = hash.split('=');

	this.unload && this.unload();

	switch (value[0]) {
		case 'profile':
			if (!value[0]) {
				this.unload = this.notFound();
			} else {
				this.unload = this.renderProfile(value[1]);
			}
		break;
		case 'user':
			if (!value[0]) {
				this.unload = this.notFound();
			} else {
				this.unload = this.renderUserNotes(this.loggedIn);
			}
		break;
		case 'note':
		default:
			if (this.loggedIn) {
				this.unload = this.renderUserNotes(this.loggedIn);
			} else {
				this.unload = this.renderHome();
			}
		break;
	}
};

WebernoteUI.prototype.formatDate = function(timeStamp) {
	var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

WebernoteUI.prototype.layout = function() {
	var tdHeight = window.innerHeight - $('td').position().top - 20,
		noteNavLinks = $('#note-nav li').find('a'),
		desc = $('#notes').find('.description');

	// Fix column heights
	$('td').height(tdHeight);
	$('#note-nav, #note-list, #show-note').height(tdHeight - 10);
	$('form').height(tdHeight - 23);

	// Make columns resizable
	$('#resizable').colResizable({
		minWidth: 60,
		liveDrag: true,
		draggingClass: 'dragging',
		onResize: function(e) {
			var columns = $(e.currentTarget).find('th, td');
		}
	});

	// Unused toolbar nav idk what to do with yet
	 $('#toolbar').find('a').on('click', function(e) {
		e.preventDefault();
	});

	// Fix left nav arrows so they work right when empty
	for (var i = 0; i < noteNavLinks.length; i++) {
		var noteNavLink = noteNavLinks[i];
		if ($(noteNavLink).siblings('ul').length === 0) {
			$(noteNavLink).css({
				background: 'none',
				padding: 0
			});
		}
	}

	// Expand / contract note nav
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

	// Ellipsis for notelist description
	for (var i = 0; i < desc.length; i++) {
		var desc = desc[i];
		$(desc).addClass('ellipses').addClass('multiline');
	}
	$('.ellipsis').ellipsis();
};

WebernoteUI.prototype.size = function(obj) {
	var size = 0;

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++;
		}
		return size;
	}
};

WebernoteUI.prototype.login = function(callback) {
	// try silent login in case already loggedIn
	var self = this;

	self.webernote.login(true, function(err, info) {
		if (!err && info) {
			callback(info);
		} else {
			callback(false);
		}
	});
};

WebernoteUI.prototype.logout = function(e) {
	if (e) {
		e.preventDefault();
	}
	this.webernote.logout();
	this.loggedIn = false;
	this.renderHome();
};

WebernoteUI.prototype.go = function(url) {
	window.History.pushstate(null, null, url);
};

WebernoteUI.prototype.goHome = function(e) {
	if (e) {
		e.preventDefault();
	}
	//this.go('/');
};

WebernoteUI.prototype.goProfile = function(userId) {
	this.go(userId);
};

WebernoteUI.prototype.goNewNote = function(newNoteId) {
	this.go(newNoteId);
};

WebernoteUI.prototype.notFound = function() {
	//this.notFound();
	this.renderHome();
}

/**
 * Render the homepage for users loggedIn or not
 */
WebernoteUI.prototype.renderHome = function(e) {
	if (e) {
		e.preventDefault();
	}

	if (this.loggedIn) {
		return this.renderUserNotes(this.loggedIn);
	}

	$('header').html($('#tmpl-header-loggedOut').html());
	$('#tags li:first').removeClass('expanded').find('.tags li').remove();
	$('#notes ul').html('');
	$('#show-note form').remove();
	this.layout();

	/*var body = Mustache.to_html($('#tmpl-content').html(), {
		classes: 'home',
		content: $('#tmpl-index-content').html()
	});*/

	var self = this,
		login = $('#login');

	// Login link handler
	login.on('click', function(e) {
		e.preventDefault();

		self.webernote.login(false, function(err, info) {
			if (!err) {
				$('.new-note').removeClass('hidden');
				login.attr('href', '#logout').text('Logout');

				//console.log('Logged In');
				self.renderUserNotes(info);
			} else {
				console.log('Login failed');
			}
		});
	});

	// attach handler to show last 5 notes
	//self.handleNewNote('notes ul', 5, self.webernote.onLatestNote.bind(self.webernote));

	return function() {
		self.webernote.unload();
	};
};

WebernoteUI.prototype.renderUserNotes = function(info) {
	var self = this;

	$('header').html($('#tmpl-header-loggedIn').html());
	this.layout();

	// If online show logout link and new note button
	if (info.status === 'online') {
		$('#loginout').find('a').attr('href', '#logout').text('Logout');
		$('.new-note').removeClass('hidden');
	}

	$('header h1').find('a').on('click', self.goHome.bind(self));
	$('#loginout').find('a').on('click', self.logout.bind(self));

	// Attach new note handler
	self.handleNote($('#notes ul'), self.webernote.onNote.bind(self.webernote));

	// Create tags handler
	self.webernote.tagsRef.on('child_added', function(tagsSnap) {
		self.createTagNav(tagsSnap);
	});

	// New note
	$('.new-note').find('a').on('click', function(e) {
		e.preventDefault();
		self.newNote();
	});

	// Select or delete note
	$('.note').on('click', function(e) {
		e.preventDefault();
		self.selectNote(e);
	});

	return function() {
		self.webernote.unload()
	};
};

WebernoteUI.prototype.selectNote = function(e) {
	var self = this;

	// Note select or delete
	var target = $(e.target),
		currentTarget = $(e.currentTarget);

	if (currentTarget.hasClass('note')) {
		var noteId = $(e.currentTarget).attr('id').split('note')[1];

		if (target.hasClass('delete')) {
			self.deleteNote(noteId);
		}
		else {
			// select note
			$('.note').removeClass('selected');
			$('#note'+ noteId).addClass('selected');

			self.getNoteData(noteId);
		}
	}
};

WebernoteUI.prototype.getNoteData = function(noteId) {
	var self = this;

	self.webernote.notesRef.child(noteId).on('value', function(noteSnap) {
		var note = noteSnap.val();

		self.showNoteForm(noteSnap.name(), note);
	});
};

WebernoteUI.prototype.newNote = function() {
	var self = this;

	var notesRef = self.webernote.notesRef.push();
	//console.log(self.webernote);
	notesRef.set({
		title: 'Untitled note...',
		notebook: 'My Notebook',
		url: '',
		tags: '',
		description: '',
		created: new Date().getTime(),
		modified: new Date().getTime()
	});

	//console.log(notesRef.name());
	$('#notes').find('.note').removeClass('selected');
	$('#note'+ notesRef.name()).addClass('selected');
	self.getNoteData(notesRef.name());
};

WebernoteUI.prototype.deleteNote = function(noteId) {
	var self = this;

	console.log(noteId);
	$('#note'+ noteId).stop().slideUp('slow').remove();
	self.webernote.notesRef.child(noteId).remove();
};

WebernoteUI.prototype.handleNote = function(listId, func) {
	var self = this;

	func(function(noteId, note, noteSnap) {
		//console.log(noteId, note);

		var initialTags = [];
		for (var key in noteSnap.val().tags) {
			initialTags.push(key);
		}
		note.tags = initialTags.join(', ');

		var availableTags = [];
		for (var keyTag in self.loggedIn.tags) {
			availableTags.push(keyTag);
		}
		self.loggedIn['availableTags'] = availableTags;

		var noteCount = noteSnap.numChildren();
		note.noteId = noteId;
		note.created = self.formatDate(note.created);
		note.modified = self.formatDate(note.modified);

		var noteEl = $(Mustache.to_html($('#tmpl-noteList-item').html(), note));
		listId.prepend(noteEl);
	});
};

WebernoteUI.prototype.createTagNav = function(tagsSnap) {
	var self = this;

	var tag = {
		tagId: tagsSnap.name(),
		noteCount: tagsSnap.numChildren()
	};

	if ($('#tag-'+ tag.tagId).length > 0) {
		if (tag.noteCount < 1 || tag.noteCount === null) {
			$('#tag-'+ tag.tagId).remove();
		} else {
			$('#tag-'+ tag.tagId).find('.count').text(tag.noteCount);
		}
	} else {
		var tagEl = $(Mustache.to_html($('#tmpl-tag-navItem').html(), tag));
		$('#tags li:first').addClass('expanded').find('.tags').removeClass('hidden').append(tagEl);
	}

	// Select or delete note
	$('.note').on('click', function(e) {
		e.preventDefault();
		self.selectNote(e);
	});
};

WebernoteUI.prototype.removeTagNav = function(tag, noteId) {
	var self = this;
	var count = $('#tag-'+ tag).find('.count');

	self.webernote.tagsRef.child(tag).on('value', function(snap) {

	});

	if (count.text() === 0) {
		$('#tag-'+ tag).remove();
	} else {
		console.log(count.text());
		count.text(count.text());
	}

	// Select or delete note
	$('.note').on('click', function(e) {
		e.preventDefault();
		self.selectNote(e);
	});
};

WebernoteUI.prototype.updateNoteForm = function(noteId, note) {
	var self = this;

	// Note form handlers to show updated content in noteList column for note on keyup
	var noteForm = $('#show-note').find('form'),
		noteList = $('#notes').find('ul');

	// Title
	noteForm.find('.title').on('keyup', function(e) {
		noteList.find('#note'+ noteId +' .title').text($(this).val());
	});
	noteForm.find('.title').on('change', function(e) {
		note.title = $(this).val();
		self.webernote.notesRef.child(noteId).child('title').set(note.title);
		self.webernote.notesRef.child(noteId).child('modified').set(new Date().getTime());
	});

	// Notebook
	noteForm.find('select.notebook').on('change', function(e) {
		console.log($(this).val());
		//if ($(this).val)
		// TODO: make last option 'New Notebook'
		// when selected it should change the select menu to a text input
		// as well as create a new notebook record plus updates the select menu
	});

	// URL
	noteForm.find('input.url').on('keyup', function(e) {
		var url = /http(s?):\/\//.test($(this).val());
		//noteList.find('#note'+ noteId +' .url').text($(this).val());
	});
	noteForm.find('input.url').on('change', function(e) {
		var url = /http(s?):\/\//.test($(this).val());
		note.url = (url) ? $(this).val() : 'http://' + $(this).val();

		self.webernote.notesRef.child(noteId).child('url').set(note.url);
		self.webernote.notesRef.child(noteId).child('modified').set(new Date().getTime());
	});

	// Tags
	var initialTags = [];
	for (var key in note.tags) {
		initialTags.push(key);
	}
	noteList.find('#note'+ noteId +' .tag-item').text(initialTags.join(', '));

	noteForm.find('.tag').tagit({
		tagSource: self.loggedIn.availableTags,
		initialTags: initialTags,
		select: true,
		tagsChanged: function(thisTag, action) {
			//console.log(thisTag + ' was ' + action);
			if (action === 'added') {
				//console.log(thisTag, noteId);
				self.webernote.tagsRef.child(thisTag).child(noteId).set(noteId);
				self.webernote.notesRef.child(noteId).child('tags').child(thisTag).set(thisTag);

				self.webernote.tagsRef.child(thisTag).on('value', function(tagsSnap) {
					//console.log(tagsSnap);
					self.createTagNav(tagsSnap);
				});

				$('.tagit-input').focus();
			} else if (action === 'popped') {
				//console.log(thisTag, noteId);
				self.webernote.tagsRef.child(thisTag).child(noteId).remove();
				self.webernote.notesRef.child(noteId).child('tags').child(thisTag).remove();

				self.removeTagNav(thisTag, noteId);

				$('.tagit-input').focus();
			}
		}
	});

	if (! $('.tagit-choice').length) {
		$('.tagit').prepend('<span class="placeholder">Click to add tags...</span>');
	}
	$('.tagit-input').on('focus', function(e) {
		$('.placeholder').hide();
	});


	// Description
	// TODO: replace this with a wyswyg editor
	noteForm.find('div.description').on('click', function(e) {
		var desc = $(this).html();
		$(this).addClass('hidden');
		$(this).next().html(desc).removeClass('hidden');
	});
	noteForm.find('textarea.description').on('keyup', function(e) {
		noteList.find('#note'+ noteId +' .description').html($(this).val());
	});
	noteForm.find('textarea.description').on('change', function(e) {
		note.description = $(this).val();

		self.webernote.notesRef.child(noteId).child('description').set(note.description);
		self.webernote.notesRef.child(noteId).child('modified').set(new Date().getTime());
	});
	noteForm.find('textarea.description').blur(function(e) {
		var desc = $(this).val();
		$(this).addClass('hidden');
		$(this).prev().html(desc).removeClass('hidden');
	});

	// Select or delete note
	$('.note').on('click', function(e) {
		e.preventDefault();
		self.selectNote(e);
	});
};


/**
 * Render noteForm in right column
 * Called when a note list item is clicked/selected in middle column
 */
WebernoteUI.prototype.showNoteForm = function(noteId, note) {
	var self = this;

	var noteForm = Mustache.to_html($('#tmpl-noteForm').html(), {
		noteId: noteId,
		title: note.title,
		notebook: note.notebook,
		url: note.url,
		tags: '<span class="placeholder">Click to add tags...</span>',
		description: note.description,
		modified: new Date().getTime()
	});
	// Make noteForm
	$('#show-note').html(noteForm);

	self.updateNoteForm(noteId, note);

	return function() {
		self.webernote.unload()
	};
};

var __webernoteUI;
$(function() {
	__webernoteUI = new WebernoteUI();
});
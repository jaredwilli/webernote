bmi_SafeAddOnload = null;

if (typeof note !== 'object') {
	note = {};
}

note = {
	common: {
		init: function() {
			//$.support.cors = true;
			note.init();
		}
	},
	init: function() {

		$('#resizable').colResizable({
			minWidth: 60,
			liveDrag: true,
			draggingClass: 'dragging',
			onResize: function(e) {
				var columns = $(e.currentTarget).find('th, td');
			}
		});

		var tdH = window.innerHeight- $('td').position().top - 20;
		$('td').height(tdH);
		$('#note-nav, #note-list, #show-note').height(tdH - 10);

		// var data = $.ajax({
		// 	url: 'js/data.json',
		// 	dataType: 'json'
		// }).done(function(r) {
		// 	console.log(r);
		// }).fail(function(e) {
		// 	console.log(e);
		// });
		// console.log(data);

		var td = document.getElementsByTagName('td');
		var noteNav = document.getElementById('note-nav');


		console.log($('td:first').width());
		console.log($('#note-nav').width());

		var noteA = $('#note-nav li').find('a');
		for (var i = 0; i < noteA.length; i++) {
			if ($(noteA[i]).siblings('ul').length === 0) {
				$(noteA[i]).css({ background: 'none', padding: 0 });
			}
		}

		// expand / contract note nav
		$('#note-nav').find('a').on('click', function(e) {
			e.preventDefault();
			console.log($(this).parent());

			if ($(this).parent().hasClass('expanded')) {
				$(this).parent().removeClass('expanded');

				$(this).siblings('ul').addClass('hidden');
			}
			else {
				$(this).parent().addClass('expanded');
				$(this).siblings('ul').removeClass('hidden');
			}
		});

		// on note click
		$('#notes').find('li').on('click', function(e) {
			e.preventDefault();
			$('#notes').find('li').removeClass('selected');
			$(this).addClass('selected');
		});

		note.trim();

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
		var namespace = note;
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
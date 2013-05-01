'use strict';

angular.module('angApp').

directive('noteblur', function() {
    return function(scope, elm, attrs) {
        elm.bind('blur', function() {
			scope.editedNote.modified = new Date().getTime();
			scope.$apply(attrs.noteblur); //scope.editedNote
        });
    };
}).

directive('selected', function() {
    return function(scope, elm, attrs) {
        elm.bind('click', function() {
			scope.editedNote.modified = new Date().getTime();
			scope.$apply(attrs.noteblur); //scope.editedNote
        });
    };
});

/*.

directive('blurnote', function() {
    return {
        link: function(scope, elm, attrs) {
            elm.bind('blur', function() {
				scope.editedNote.modified = new Date().getTime();
				scope.editNote(scope.editedNote);
            });
        }
    };
})

directive('togglenav', function() {
	return {
		link: function(scope, element, attrs) {
			var topLi = element.children('li')[0];
			var opened = true;
			//console.log(topLi);

			// Toggle the closed/opened state
			var toggle = function() {
				opened = !opened;

				var elem = element[0].firstElementChild;

				elem.removeClass(opened ? '' : 'expanded');
				elem.addClass(opened ? 'expanded' : '');
			};

			for (var i = 0; i < topLi.length; i++) {
				topLi[i].bind('click', toggle);
			}
			// initialize the zippy
			toggle();
		}
	};
})*/;

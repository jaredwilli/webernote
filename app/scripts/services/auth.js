'use strict';

angular.module('angApp').

factory('authService', [
	'angularFire',

	function(angularFire) {
		var url = 'https://jaredwilli.firebaseio.com/';

		// Public API here
		return {
			getRef: function(path) {
				var ref = angularFireCollection(url + '/' + path);
				return ref;
			}
		};
	}
]);
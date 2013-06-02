'use strict';

angular.module('angApp').

factory('fireFactory', [
	function fireFactory() {
		return {
			firebaseRef: function(path) {
				var baseUrl = 'https://webernote.firebaseio.com';
				path = (path !== '') ?  baseUrl + '/' + path : baseUrl;
				return new Firebase(path);
			}
		};
	}
]);
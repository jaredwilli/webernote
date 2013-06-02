'use strict';

app.

directive('loginout', function() {
	return {
		restrict: 'A',
		scope: '=',
		template: '<a id="{{ loggText | lowercase }}" ng-click="loggAction()" href="">{{ loggText }}</a>',
		link: function(scope, element, attrs) {
			console.log('loginout args: ', scope, element, attrs);

			var parent = scope.$parent;
			console.log('parent: ', parent);


			parent.$watch('isLoggedIn', function(isLoggedIn) {
				console.log(isLoggedIn);
				//console.log(attrs.loginout = 'test');

				scope.loggText = (parent.isLoggedIn) ? 'Logout' : 'Login';
				scope.loggAction = (parent.isLoggedIn) ? scope.logout : scope.login;

			});

			scope.login = function() {
				parent.login();
			};
			scope.logout = function() {
				parent.logout();
			};
		}
	};
}).

directive('isLoggedIn', function() {
	return {
		restrict: 'E,A',
		scope: '@',
		link: function(scope, elem, attrs) {
			var parent = scope.$parent;

			console.log(parent);

			parent.$watch('isLoggedIn', function() {

			});
		}
	};
});
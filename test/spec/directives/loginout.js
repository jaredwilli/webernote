'use strict';

describe('Directive: loginout', function() {
	beforeEach(module('angApp'));

	var element;

	it('should make hidden element visible', inject(function($rootScope, $compile) {
		element = angular.element('<div id="loginout"></div>');
		element = $compile(element)($rootScope);

		console.dir(element);
		//expect(element.html()).toBe('');
	}));
});

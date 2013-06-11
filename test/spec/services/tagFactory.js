'use strict';

describe('Service: tagFactory', function() {

	// load the service's module
	beforeEach(module('angApp'));

	// instantiate service
	var tagFactory;
	beforeEach(inject(function(_tagFactory_) {
		tagFactory = _tagFactory_;
	}));

	it('should do something', function() {
		expect(!!tagFactory).toBe(true);
	});

});

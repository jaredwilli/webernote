'use strict';

describe('Service: notebookFactory', function() {

	// load the service's module
	beforeEach(module('angApp'));

	// instantiate service
	var notebookFactory;
	beforeEach(inject(function(_notebookFactory_) {
		notebookFactory = _notebookFactory_;
	}));

	it('should do something', function() {
		// expect(!!notebookFactory).toBe(true);
	});
});

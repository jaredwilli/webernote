/*
https://amitgharat.wordpress.com/tag/testing-angularjs-service/
http://blog.pluralsight.com/2013/06/11/video-testing-angularjs-services-with-dependencies/?goback=%2Egde_4896676_member_252199317

https://amitgharat.wordpress.com/2013/05/04/writing-testable-application-in-angularjs-part-1/
https://amitgharat.wordpress.com/2013/05/04/writing-testable-application-in-angularjs-part-2/
http://amitgharat.wordpress.com/2013/05/04/writing-testable-application-in-angularjs-part-3/
http://amitgharat.wordpress.com/2013/05/04/writing-testable-application-in-angularjs-part-4/
http://amitgharat.wordpress.com/2013/05/04/writing-testable-application-in-angularjs-part-5/

https://amitgharat.wordpress.com/tag/testing-angular-directive/
https://amitgharat.wordpress.com/tag/testing-angularjs-controller/
https://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/
*/

'use strict';

describe("Controller: AuthCtrl", function() {
	beforeEach(angular.mock.module('angApp', 'mockedUsers'));

	var AuthCtrl, scope, mockedUsers, httpBackend;

	describe("has users", function() {
		beforeEach(angular.mock.inject(function($controller, $rootScope, $httpBackend, defaultJSON, angularFire) {
	        $httpBackend.whenJSONP('/').respond(defaultJSON);

	        scope = $rootScope.$new();
	        AuthCtrl = $controller("AuthCtrl", {
	            $scope: scope
	        });
			scope = defaultJSON;

	        //console.log('USERS: ', defaultJSON)
			//console.log(scope.users[13538912].notes);
	    }));

		it('should have 2 users', function() {
			//expect(scope.users.length).toBe(2);
			expect(scope.users[13538912]).not.toBe(undefined);
			expect(scope.users[218374]).not.toBe(undefined);
		});

		it('first user should have notes, notebooks, and tags', function() {
			expect(scope.users[13538912].notes['-ItsOTwSR2Ihqp0qKQR5']).not.toBe(undefined);
			expect(scope.users[13538912].notebooks.length).toBe(2);
			expect(scope.users[13538912].tags.length).toBe(3);
		});
			// //httpBackend.flush();

		it('should have a notebook My Notebook', function() {
			expect(scope.users[13538912].notebooks[0].text).toBe('My Notebook');
		});

		it('should have a tag called html and 2 note ids', function() {
			expect(scope.users[13538912].tags[1].text).toBe('html');
			expect(scope.users[13538912].tags[1].notes[0]).toBe('-ItsgCvRAP0pS4_4qDEZ');
			expect(scope.users[13538912].tags[1].notes[1]).toBe('-Its_XcGM9on3LliGPrK');
		});

		it('should have a note titled Dev Notes', function() {
			expect(scope.users[13538912].notes['-ItsOTwSR2Ihqp0qKQR5'].title).toBe('Testing note');
		});
	});
});

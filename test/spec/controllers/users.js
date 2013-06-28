'use strict';

describe("Controller: UsersCtrl", function() {
	beforeEach(angular.mock.module('angApp', 'mockedUsers'));
	beforeEach(module('angApp', 'noteFactory'));

	var UsersCtrl, scope, noteFactory, mockedUsers, httpBackend;

	describe("user notes", function() {
		beforeEach(angular.mock.inject(function($controller, $rootScope, $httpBackend, defaultJSON, angularFire) {
			$httpBackend.whenJSONP('/').respond(defaultJSON);

			scope = $rootScope.$new();
			UsersCtrl = $controller("UsersCtrl", {
				$scope: scope
			});
			scope = defaultJSON;

			console.log('NOTEFactory: ', noteFactory)
			console.log('USERS: ', defaultJSON)
			console.log(scope.users[13538912].notes);
		}));

		/*it('should have 2 users', function() {
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
		});*/
	});
});

'use strict';

describe("Unit: Testing Controllers", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');

	});

	describe('NoteCtrl', function() {
		it('should create "note" model with 1 note', inject(function($rootScope, $controller, $location, angularFire, fireFactory) {
			//var scope = $rootScope.$new();
			var ctrl = $controller('NoteCtrl', {
				$scope: $rootScope.$new()
			});

			console.log(ctrl);
			ctrl.name = 'NoteCtrl'
			ctrl.note = {

			}

			/*expect(ctrl.$scope.note.length).toBe(1);*/
      }));
	});
});
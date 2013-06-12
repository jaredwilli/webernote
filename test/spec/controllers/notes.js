'use strict';

describe("Unit: NoteCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');

	});

	describe('creating models', function() {
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
'use strict';

describe("Unit: UsersCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');


	});

	describe('creating models', function() {
		it('should create "user" model with 1 user', inject(function($rootScope, $controller, $location, angularFire, fireFactory) {
			//var scope = $rootScope.$new();
			var ctrl = $controller('UserCtrl', {
				$scope: $rootScope.$new()
			});

			console.log(ctrl);
			ctrl.name = 'UserCtrl'

			/*expect(ctrl.$scope.user.length).toBe(1);*/
      }));
	});
});
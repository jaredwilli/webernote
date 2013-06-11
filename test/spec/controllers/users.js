'use strict';

describe("Unit: Testing Controllers", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');


	});

	describe('UsersCtrl', function() {
		it('should create "user" model with 1 user', inject(function($rootScope, $controller, $location, angularFire, fireFactory) {
			//var scope = $rootScope.$new();
			var ctrl = $controller('UserCtrl', {
				$scope: $rootScope.$new()
			});

			console.log(ctrl);
			ctrl.name = 'UserCtrl'
			ctrl.user = {

			}

			/*expect(ctrl.$scope.user.length).toBe(1);*/
      }));
	});
});
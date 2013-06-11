'use strict';

describe("Controller: AuthCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');

	});

	describe('AuthCtrl', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("AuthCtrl", {
                $scope: scope
            });
        }));

		it('should create a name model', function() {
			expect(scope.name).toBe('AuthCtrl');
		});


	});
});
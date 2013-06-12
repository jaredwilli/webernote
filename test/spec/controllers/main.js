'use strict';

describe("Controller: MainCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp');

	});

	describe('creating models', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("MainCtrl", {
                $scope: scope
            });
        }));

		it('should create a name model', function() {
			// expect(scope.name).toBe('MainCtrl');
		});


		it('should ', function() {
			// expect(scope.name).toBe('MainCtrl');
		});


	});
});
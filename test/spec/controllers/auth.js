'use strict';

describe("Controller: AuthCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		module('angApp', ['ui.select2']);

	});

	describe('creating models', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("AuthCtrl", {
                $scope: scope
            });
            $scope.name = 'AuthCtrl';
        }));

		it('should create a name model', function() {
			// expect(scope.name).toBe('AuthCtrl');
		});


	});
});
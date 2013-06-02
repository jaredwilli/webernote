describe("Unit: Testing Controllers", function() {
	describe("MainCtrl", function() {
		var scope, ctrl;

		beforeEach(function() {
			scope = {};
			console.log(angular.mock());
			ctrl = angular.mock('MainCtrl');
		});

		it('Should create a notes model with at least 1 note', function() {
			console.log(ctrl);
			expect(scope.notes.length).toBe(5);
		});

	});
});
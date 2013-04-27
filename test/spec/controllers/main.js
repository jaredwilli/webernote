describe("Unit: Testing Controllers", function() {
	describe("MainCtrl", function() {
		var scope, ctrl;

		beforeEach(function() {
			scope = {},
			ctrl = new MainCtrl(scope);
		});

		it('Should create a notes model with at least 1 note', function() {
			expect(scope.notes.length).toBe(5);
		});

	});
});
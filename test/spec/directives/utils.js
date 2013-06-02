'use strict';

describe('Directive: utils', function () {
  beforeEach(module('angApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<utils></utils>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the utils directive');
  }));
});

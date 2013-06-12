'use strict';

describe('Directive: layout', function () {
  beforeEach(module('angApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<layout></layout>');
    element = $compile(element)($rootScope);

    // expect(element.text()).toBe('this is the layout directive');
  }));
});

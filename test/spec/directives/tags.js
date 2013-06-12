'use strict';

describe('Directive: tags', function () {
  beforeEach(module('angApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<tags></tags>');
    element = $compile(element)($rootScope);

    // expect(element.text()).toBe('this is the tags directive');
  }));
});

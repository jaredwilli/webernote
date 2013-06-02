'use strict';

describe('Directive: noteForm', function () {
  beforeEach(module('angApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<note-form></note-form>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the noteForm directive');
  }));
});

'use strict';

describe('Directive: noteBlur', function () {
  beforeEach(module('angApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<note-blur></note-blur>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the noteBlur directive');
  }));
});

describe('Unit testing D3 chart', function() {
  var $compile, $rootScope;
  beforeEach(module('mainApp'));
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
	var scope = $rootScope.$new();
  }));
  it('Replaces the element with the appropriate content', function() {
     element = angular.element("<d3-area></d3-area>");
     var scope = $rootScope.$new();
     $compile(element)(scope);
     scope.$digest();
	 d3.select(element[0]).append('svg');
     expect(element.html()).toContain("<svg>");
  });  
});

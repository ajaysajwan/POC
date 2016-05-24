describe("Test for charts/directives/area-chart.js", function () {
    var compile, scope, directiveElem;
	beforeEach(inject(function($rootScope,$compile) {
        scope = $rootScope.$new();
        element =
      	'<svg width="500" height="400" aria-label="A chart." style="overflow: hidden;"></svg>';
		element = $compile(element)(scope);
        scope.$digest();
  }));
  describe('test for area directive content', function () {
	it("should contain area chart with proper size", function() {
    	expect(element.attr('width')).toEqual('500');
      		expect(element.attr('height')).toBe('400');
    	});
    });
});

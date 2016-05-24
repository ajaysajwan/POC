/// <reference path="D:\My Personals\Training Conducted\karma unit test cases\ORG LEVEL\DirectiveTest\DirectiveTest\Scripts\jasmine\jasmine.d.ts" />
describe("Test for column-chart.js", function () {
    var compile, scope, directiveElem;

    /*function getCompiledElement() {
        var element = angular.element('<col-chart></col-chart>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }*/

beforeEach(inject(function($rootScope,$compile) {
        scope = $rootScope.$new();
        element =
      	'<svg width="500" height="400" aria-label="A chart." style="overflow: hidden;"></svg>';
		element = $compile(element)(scope);
        scope.$digest();
  }));
  
   describe('test for column directive content', function () {
		it("should contain column chart with proper size", function() {
        	expect(element.attr('width')).toBe('500');
      		expect(element.attr('height')).toBe('400');
    	});
        /*it('should have a span element appended', function () {
            var spanElement = directiveElem.find('span');
            console.log(spanElement);
            expect(spanElement.length).toEqual(2);
        });
        it('should have the expected text inside span element', function () {
            var spanElement = directiveElem.find('span');
            expect(angular.element(spanElement[0]).text()).toEqual("This span is appended from directive.");
        });*/
    });

});

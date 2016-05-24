describe("Bar Chart directive Test case spec", function () {
   
        var compile, scope, directiveElem, template;

        beforeEach(function(){
            module('donutApp');
            inject(function($compile, $rootScope, $interval){
                compile = $compile;
                scope = $rootScope.$new();
                scope.height = {
                    prop: 'value'
                };
                scope.data = [{
                    prop: 'value'
                }];
                scope.color = {
                    prop: 'red'
                };
            });
            directiveElem = getCompiledElement();
        });
        
        function getCompiledElement(){
           var element = angular.element('<bar-chart height="height" data="data" color="color"></bar-chart>');
          
           var compiledElement = compile(element)(scope);
           
           scope.$digest();
           return compiledElement;
        }
    
        xit('should give the count of h2 elements inside template', function(){
            var h2Element = directiveElem.find('h2');
            expect(h2Element.length).toEqual(1);

        });
    
});
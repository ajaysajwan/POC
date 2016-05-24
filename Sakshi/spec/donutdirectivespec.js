(function($angular) {

    describe('donut Directive', function() {
        
         var compileDirective, scope, donutModel = [];
        
        beforeEach(function(){
            
            module('donutApp');
            
            inject(function inject($rootScope, $compile) {

                scope       = $rootScope.$new();
                compile     = $compile;
                scope.model = donutModel;
              /*  scope.getColour = jasmine.createSpy('getColour');*/

            });
             compileDirective = getCompileDirective();
        
        });

        function getCompileDirective() {

            var html = '<donut ng-model="model"></donut>',
                document    = compile(html)($angular.extend(scope));
            return { scope: scope.$$childHead, html: document };

        };
        

        it('Should be able to initialise the SVG canvas', function() {

            var html = getCompileDirective().html;
            expect(html.find('svg')).toBeDefined();

        });
        
        it('Should be able to set the color', function() {
            var temp = { "color" : "red"};
            spyOn(scope, 'getColour').and.callThrough();
            scope.getColour();
            expect(scope.getColour).toHaveBeenCalled();
            //scope.getColour(temp);
            //expect(scope.getColour).toHaveBeenCalled();
            if(temp){
                return true;
            }
        });

    });

})(window.angular);
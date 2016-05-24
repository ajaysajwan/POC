/*-Test-case file for module 2-*/


describe("Home Chart controller spec", function () {
    beforeEach(module('myApp'));

        var controller, scope;
        beforeEach(inject(function (_$controller_) {
            scope = {};
            
            
            controller = _$controller_('ChartCtrl', {
                $scope: scope
            });
            console.log(scope);
        }));
        it('should have chart1 property', function () {
            expect(scope.chart1).toBeDefined();
        });
        
    
        
        
//        it('should have test property equal to "test string"', function () {
//            expect($scope.test).toEqual("someTestValue");
//        });
});

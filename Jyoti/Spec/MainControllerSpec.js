describe("Main Ctrl spec", function () {
    beforeEach(module('mainApp'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));
    describe('scope of ctrl', function () {
        var controller, scope;
        beforeEach(inject(function (_$controller_) {
            $scope = {
            };
            controller = $controller('mainController', {
                $scope: $scope
            });
        }));
        it('should have colors property', function () {
            expect($scope.colors).toBeDefined();
        });
		it('chart data must be defined', function () {
            expect($scope.sellerOptions).toBeDefined();
        });
    });
});

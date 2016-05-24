describe("donutService spec", function () {
    beforeEach(module('donutApp'));
    var donutService, $httpBackend;
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    beforeEach(inject(function (_DonutService_, _$httpBackend_) {
        donutService = _DonutService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('data/chartModelData.json').respond([{prop1:'x',prop2:'y'}]);
    }));

    describe("call getDonutData", function () {
        it("shoould return expected array of source data", function () {
            var donutData;
            donutService.getDonutModel().then(function (data) {
                donutData = data.data;
                expect(donutData).toEqual([{prop1:'x',prop2:'y'}]);
            });
            console.log('before flush');
            $httpBackend.flush();
		    console.log('after flush');
        });
    });
});
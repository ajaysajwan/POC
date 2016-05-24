/*-Test-case for Chart Service-*/
describe("chartData Http spec", function () {
    beforeEach(module('myApp'));
    var chartData;
    var $httpBackend;

   afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    beforeEach(inject(function (_chartData_, _$httpBackend_) {
        chartData = _chartData_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('app/home/data1.json').respond([{prop1:'x',prop2:'y'}]);
        
    }));
    
 
        it("should return expected array of visitors count", function () {
            var cData;
           // $httpBackend.expectGET('EmployeeData.json');
            chartData.getChartData().then(function (data) {
                cData = data.data;
                expect(cData).toEqual([{prop1:'x',prop2:'y'}]);
            });
             console.log('before flush');
             $httpBackend.flush();
 
        });
 
});
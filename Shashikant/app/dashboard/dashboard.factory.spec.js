'use strict';
describe('Dashboard Factory Test Case-', function () {
    beforeEach(module('dashboard.factory'));
    var dashboardFactory, httpBackend;
    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });
    beforeEach(inject(function(_ChartFactory_,_$httpBackend_){
        dashboardFactory = _ChartFactory_;
        httpBackend = _$httpBackend_;
        httpBackend.whenGET('data/data.json').respond(200,[{POC:'dashboard',tech:'angularjs'}]);
    }));
    it('ChartFactory should be defined',function(){        
        expect(dashboardFactory).toBeDefined();
    });
    it('Should return data after call getBookingDetails factory',function(){
        var tempData;
        dashboardFactory.getBookingDetails().then(function(resp){
            tempData = resp.data;
            expect(resp.status).toBe(200);
            expect(tempData).toEqual([{POC:'dashboard',tech:'angularjs'}]);
        });
        httpBackend.flush();
    });
});
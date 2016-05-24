'use strict';
describe('Dashboard Controller Test Case-', function () {
    var scope, dashboardFactory, controller, httpBackend, vm;
    var respData = [
        {
            "2016": [
                {
                    "JAN": {
                        "ageGroup": {
                            "ageGroup2035": {
                                "totalBooking": 220
                            }
                            , "ageGroup3550": {
                                "totalBooking": 250
                            }
                            , "ageGroup5070": {
                                "totalBooking": 323
                            }
                        }
                        , "profit": 60
                        , "mTotalBooking": 793
                    }
                    , "FEB": {
                        "ageGroup": {
                            "ageGroup2035": {
                                "totalBooking": 124
                            }
                            , "ageGroup3550": {
                                "totalBooking": 523
                            }
                            , "ageGroup5070": {
                                "totalBooking": 485
                            }
                        }
                        , "profit": 64
                        , "mTotalBooking": 1132
                    }
                    , "MAR": {
                        "ageGroup": {
                            "ageGroup2035": {
                                "totalBooking": 245
                            }
                            , "ageGroup3550": {
                                "totalBooking": 452
                            }
                            , "ageGroup5070": {
                                "totalBooking": 123
                            }
                        }
                        , "profit": 90
                        , "mTotalBooking": 820
                    }
                    , "APR": {
                        "ageGroup": {
                            "ageGroup2035": {
                                "totalBooking": 86
                            }
                            , "ageGroup3550": {
                                "totalBooking": 254
                            }
                            , "ageGroup5070": {
                                "totalBooking": 142
                            }
                        }
                        , "profit": 49
                        , "mTotalBooking": 482
                    }
            }
        ]
    }
];
    beforeEach(function () {
        module('app.dashboard');
        inject(function (_$controller_, _$httpBackend_, _ChartFactory_, _$rootScope_) {
            scope = _$rootScope_.$new();
            controller = _$controller_;
            httpBackend = _$httpBackend_;
            dashboardFactory = _ChartFactory_;
            controller = _$controller_('DashboardCtrl', {
                $scope: scope
            });

            httpBackend.whenGET('app/dashboard/dashboard.html').respond({});
        })
    });
    it('ChartFactory should be defined', function () {
        expect(dashboardFactory).toBeDefined();
    });

    it('Check getBookingDetails API call in controller', function () {
        httpBackend.whenGET('data/data.json').respond(respData);
        var result;
        dashboardFactory.getBookingDetails().then(function (resp) {
            result = resp.data;
            expect(result).toEqual(respData);
        });
        httpBackend.flush();
    });
    it('If getBookingDetails API returns error', function () {
        httpBackend.whenGET('data/data.json').respond(404, 'Error');
        dashboardFactory.getBookingDetails().then(
            function (resp) {
                console.log(resp);
            }
            , function (error) {
                expect(error.status).toEqual(404);
                expect(error.data).toEqual('Error');
            });
        httpBackend.flush();

    });
    it('Variable is defined', function () {
        expect(controller.isFlip).toBeDefined(false);
        expect(controller.isOpen).toEqual(false);
        expect(controller.isFlip).toBeDefined();
        expect(controller.slideClose).toBeDefined();
        expect(controller.flip).toBeDefined();

    });
    it('Method called', function () {
        spyOn(controller, 'flip').and.callThrough();
        controller.flip();
        expect(controller.flip).toHaveBeenCalled();
        expect(controller.isFlip).toBeDefined(false);

        spyOn(controller, 'slideClose').and.callThrough();
        controller.slideClose();
        expect(controller.slideClose).toHaveBeenCalled();
        expect(controller.isOpen).toBe(false);

        controller.data = [{
            value: 1
        }, {
            value: 1
        }, {
            value: 1
        }, {
            value: 1
        }];
        spyOn(controller, 'updateData').and.callThrough();
        controller.updateData();
        expect(controller.updateData).toHaveBeenCalled();
    });
    it('chartClick method called and api success and return result', function () {
        var dataObj = [{
            label: 'JAN',
            fillColor:"#c93c72",
            highlightColor:"#c93c72",
            value:1132
        }];
        spyOn(controller, 'chartClick').and.callThrough();
        controller.chartClick(dataObj);
        expect(controller.chartClick).toHaveBeenCalled();
        controller.chartClick(false);
        expect(controller.chartClick).toHaveBeenCalled();
        if (dataObj.length) {
            httpBackend.whenGET('data/data.json').respond(200, respData);
            var result;
            dashboardFactory.getBookingDetails().then(
                function (resp) {
                    expect(resp.data).toEqual(respData);
                    expect(controller.isOpen).toEqual(true);
                }
                , function (error) {
                    expect(error.status).toEqual(404);
                });
            httpBackend.flush();
        }
    });
    it('chartClick method called and api error and return error', function () {
        var dataObj = [{
            label: 'JAN',
            fillColor:"#c93c72",
            highlightColor:"#c93c72",
            value:1132
        }];

        spyOn(controller, 'chartClick').and.callThrough();
        controller.chartClick(dataObj);
        expect(controller.chartClick).toHaveBeenCalled();
        if (dataObj.length) {
            httpBackend.whenGET('data/data.json').respond(404, [{
                prop1: 'x'
                        }]);
            var result;
            dashboardFactory.getBookingDetails().then(
                function (resp) {
                    result = resp.data;
                    expect(result).toEqual([{
                        prop1: 'x'
                        }]);
                }
                , function (error) {
                    expect(error.status).toEqual(404);
                    //                    expect(error.data).toEqual('Error');
                });
            httpBackend.flush();
        }
    });
    it('showAgeGroupChart method called', function () {
        spyOn(controller, 'showAgeGroupChart').and.callThrough();
        controller.showAgeGroupChart(controller.selectedVal);
        controller.showAgeGroupChart(false);
        expect(controller.showAgeGroupChart).toHaveBeenCalled();
        if (controller.selectedVal) {
            httpBackend.whenGET('data/data.json').respond(200, respData);
            var result;
            dashboardFactory.getBookingDetails().then(
                function (resp) {
                    result = resp.data;    
                    expect(result).toEqual(respData);
                }
                , function (error) {
                    expect(error.status).toEqual(404);
                });
            httpBackend.flush();
        }
    });
    it('showAgeGroupChart method called and api error and return error', function () {
        spyOn(controller, 'showAgeGroupChart').and.callThrough();
        controller.showAgeGroupChart(controller.selectedVal);
        httpBackend.whenGET('data/data.json').respond(404, [{
            prop1: 'x'
                        }]);
        var result;
        dashboardFactory.getBookingDetails().then(
            function (resp) {
                result = resp.data;
                expect(result).toEqual([{
                    prop1: 'x'
                        }]);
            }
            , function (error) {
                expect(error.status).toEqual(404);
                //                    expect(error.data).toEqual('Error');
            });
        httpBackend.flush();
    })
});
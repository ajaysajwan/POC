'use strict';
describe("Dashboard Route Test Case-",function(){
    beforeEach(module('app.config'));
    var controller, route, location,rootscope, httpbackend;
    
    beforeEach(inject(function(_$location_,_$route_,_$controller_,_$rootScope_,_$httpBackend_){
        controller = _$controller_;
        route = _$route_;
        location = _$location_;
        rootscope = _$rootScope_;
        httpbackend = _$httpBackend_;
    }));
    it('Default route path should be /dashboard and should load controlle and html for dashboard',function(){
        var dashBoardRoute = route.routes['/dashboard'];
        expect(dashBoardRoute).toBeDefined();
        expect(dashBoardRoute.controller).toEqual('DashboardCtrl');
        expect(dashBoardRoute.templateUrl).toEqual('app/dashboard/dashboard.html');
    })
});
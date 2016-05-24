describe("Route Testing", function() {
  beforeEach(module("graphApp"));
  var controller, route, location, rootscope, httpbackend;
  beforeEach(inject(function(_$location_, _$route_, _$controller_, _$rootScope_, _$httpBackend_) {
    controller = _$controller_;
    location = _$location_;
    httpbackend = _$httpBackend_;
    route = _$route_;
    rootscope = _$rootScope_;
  }));
  describe("Route Testing", function() {
    it('Default route path shoud equal to /aboutNVD3', function() {
      httpbackend.expectGET('app/views/NVD3.html').respond({});
      expect(route.current).toBeUndefined();
      location.path('/aboutNVD3');
      rootscope.$digest();
      expect(location.path()).toBe('/aboutNVD3');
      expect(route.current.templateUrl).toBe('app/views/NVD3.html');
      expect(route.current.controller).toBe('graphController');

      location.path('/otherwise');
      rootscope.$digest();
      expect(location.path()).toBe('/aboutNVD3');
      expect(route.current.templateUrl).toBe('app/views/NVD3.html');
      expect(route.current.controller).toBe('graphController');


      location.path('');
      rootscope.$digest();
      expect(location.path()).toBe('/aboutNVD3');
      expect(route.current.templateUrl).toBe('app/views/NVD3.html');
      expect(route.current.controller).toBe('graphController');
    });

    it("route path should be equal to /getGraphData", function() {
      httpbackend.expectGET("app/views/graph.html").respond({});
      expect(route.current).toBeUndefined();
      location.path("/getGraphData");
      rootscope.$digest();
      expect(location.path()).toBe("/getGraphData");
      expect(route.current.templateUrl).toBe("app/views/graph.html");
      expect(route.current.controller).toBe("graphController");
    });
  })
});
describe('Get Chart Data', function(){
    var chartFactory;
    beforeEach(function(){
        module('mainApp');
        inject( function($injector){
            chartFactory = $injector.get('chartFactory');
        });
    });
  	it('Get chart data succefully using ajax (200 status)', inject(function($http,$httpBackend) {  
		var $scope = {};
		/** Get data from josn file **/
		$http.get('charts/data/stocks.json')
		.success(function(data, status) {
		  $scope.valid = true;
		  $scope.response = data;
		})
		.error(function(data, status) {
		  $scope.valid = false;
		});
		/* End */

		$httpBackend
		.when('GET', 'charts/data/stocks.json')
		.respond(200, { chartData: 'received' });

		$httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({ chartData: 'received' });

	}));
});


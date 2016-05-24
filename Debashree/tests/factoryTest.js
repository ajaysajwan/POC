describe("GRAPH Factory Test Case ", function() {
   beforeEach(module('graphApp'));
   afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe("call getDropDownOptions", function() {
        beforeEach(inject(function(_dropDownData_, _$httpBackend_) {
        dropDownData = _dropDownData_;
        $httpBackend = _$httpBackend_;
       $httpBackend.whenGET('app/views/NVD3.html').respond([{
            prop1: 'x',
            prop2: 'y'
        }]);
        $httpBackend.whenGET('../assets/json/dropdownData.json').respond([{
            prop1: 'x',
            prop2: 'y'
        }]);
    }));

        it("shoould return list of dropdown value", function() {
            var dropdownList;

            dropDownData.getDropDownOptions().then(function(data) {
                dropdownList = data.data;
                expect(dropdownList).toEqual([{
                    prop1: 'x',
                    prop2: 'y'
                }]);
            });
            $httpBackend.flush();
        });
    });

    describe("call getAllHotels", function() {
         beforeEach(inject(function(_dataFetch_, _$httpBackend_) {
        dataFetch = _dataFetch_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('app/views/NVD3.html').respond([{
            prop1: 'x',
            prop2: 'y'
        }]);
        $httpBackend.whenGET('../assets/json/graphData.json').respond([{
            prop1: 'x',
            prop2: 'y'
        }]);
    }));
        
        it("should return list hotel data", function() {
            var dataList;

            dataFetch.getAllHotels().then(function(data) {
                dataList = data.data;
                expect(dataList).toEqual([{
                    prop1: 'x',
                    prop2: 'y'
                }]);
            });
            $httpBackend.flush();
        });
    });
    
  describe("call nv ", function () {
    var nvTest, httpBackend;
    beforeEach(inject(function (_nvTest_, $httpBackend) {
      nvTest = _nvTest_;
      httpBackend = $httpBackend;
    }));

      it ('should be loaded', function() {
          expect(nvTest).toBeDefined();
      });

  });
    
    describe("call d3 ", function () {
    var d3Test, httpBackend;

    beforeEach(inject(function (_d3Test_, $httpBackend) {
      d3Test = _d3Test_;
      httpBackend = $httpBackend;
    }));

      it ('should be loaded', function() {
          expect(d3Test).toBeDefined();
      });

  });
    
});
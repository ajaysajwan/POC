'use strict';
describe('Controller Testing', function() {
  var scopeTemp, controllerTemp, httpBackend, dataFetch, dropDownData, chart;
  beforeEach(function() {
    module('graphApp');
    inject(function(_$controller_, _$httpBackend_, _dataFetch_, _dropDownData_) {
      scopeTemp = {};
      controllerTemp = _$controller_;
      httpBackend = _$httpBackend_;
      dataFetch = _dataFetch_;
      dropDownData = _dropDownData_
      controllerTemp = _$controller_('graphController', {
        $scope: scopeTemp
      });
      httpBackend.whenGET('app/views/graph.html').respond();
      httpBackend.whenGET('app/views/NVD3.html').respond([{
        prop1: 'x',
        prop2: 'y'
      }]);
    })
  });
    
  it('Should have table defined', function() {
    scopeTemp.showTable();
    expect(scopeTemp.showTableData).toEqual(true);
  });
    
  it('Should have dropdownOptions defined', function() {
    expect(scopeTemp.dropdownOptions).toBeDefined();
  });
    
  it('Should have initial property defined', function() {
    scopeTemp.getData();
    expect(scopeTemp.initial).toBeDefined();
  });
    
  it('should load graph data', function() {
    httpBackend.whenGET('../assets/json/dropdownData.json').respond({
      prop2: 'graph'
    });
    httpBackend.whenGET('../assets/json/graphData.json').respond({
      prop1: 'graph'
    });
    scopeTemp.getData(scopeTemp.selected_items);
    var graphList;
    dataFetch.getAllHotels().then(
      function(resp) {
        graphList = resp.data;
        expect(graphList).toEqual({
          prop1: 'graph'
        });
      });
    httpBackend.flush();
  });
    
  it('should return error graph data successfully', function() {
    httpBackend.whenGET('../assets/json/dropdownData.json').respond({
      prop2: 'x'
    });
    httpBackend.whenGET('../assets/json/graphData.json').respond(404, 'Error');
    scopeTemp.graphOnClick();
    scopeTemp.getData();
    dataFetch.getAllHotels().then(function(success) {},
      function(error) {
        expect(error.status).toEqual(404);
        expect(error.data).toEqual('Error');
      }
    );
    httpBackend.flush();
  });
    
  it('should load dropdownOptin data successfully', function() {
    httpBackend.whenGET('../assets/json/dropdownData.json').respond({
      prop1: 'x'
    });
    var dropdownList;
    dropDownData.getDropDownOptions().then(
      function(resp) {
        dropdownList = resp.data;
        expect(dropdownList).toEqual({
          prop1: 'x'
        });
      });
    httpBackend.flush();
  });
    
  it('should return error dropdown data successfully', function() {
    httpBackend.whenGET('../assets/json/dropdownData.json').respond(404, 'Error');
    var dropdownList;
    dropDownData.getDropDownOptions().then(function(success) {},
      function(error) {
        expect(error.status).toEqual(404);
        expect(error.data).toEqual('Error');
      }
    );
    httpBackend.flush();
  });
});
describe("Directive Test for ", function() {
  describe("Pi directive", function() {
    var compile, scope, directiveElem, chart2;
    beforeEach(function() {
      module('graphApp');
      inject(function($compile, $rootScope, $interval) {
        compile = $compile;
        scope = $rootScope.$new();
        interval = $interval;
        scope.pie = {
          prop: 'value'
        };
      });
      directiveElem = getCompiledElement();
    });
    it('checks that pie on isolated scope should be two-way bound and scope functions called', function() {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.pie.prop = "value1";
      expect(scope.pie.prop).toEqual('value1');
    });

    function getCompiledElement() {
      var compiledDirective = compile(angular.element('<pie-chart pie="pie"></pie-chart>'))(scope);
      scope.$digest();
      return compiledDirective;
    };
  });

  describe("Graph directive", function() {
    var compile, scope, interval, directiveElem;
    beforeEach(function() {
      module('graphApp');
      inject(function($compile, $rootScope, $interval) {
        compile = $compile;
        scope = $rootScope.$new();
        interval = $interval;
        scope.data = {
          prop: 'value'
        };
        scope.chartType = {
          prop: 'abc'
        };
      });
      directiveElem = getCompiledElement();
    });

    it('checks that charttype on isolated scope should be two-way bound', function() {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.selectChart();
      isolatedScope.show();
      isolatedScope.chartType.prop = "value1";
      expect(scope.chartType.prop).toEqual('value1');
    });

    it('checks that data on isolated scope should be two-way bound', function() {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.data.prop = "value1";
      expect(scope.data.prop).toEqual('value1');
    });

    function getCompiledElement() {
      var compiledDirective = compile(angular.element('<graph-nv data="data" chart-type="chartType"></graph-nv>'))(scope);
      scope.$digest();
      return compiledDirective;
    };
  });

  describe("multidropdown directive", function() {
    var compile, scope, interval, directiveElem;
    beforeEach(function() {
      module('graphApp');
      inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
        scope.dropdownTitle = "abc";
        scope.model = [];
        scope.options = [{
          checked: true,
          name: 'MARRIOT'
        }];

        scope.option = {
          checked: true,
          name: 'Hayyat'
        };
        scope.checkAll = false;
      });
      directiveElem = getCompiledElement();
    });

    it('checks function checkAllClicked called', function() {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.checkAllClicked();
      isolatedScope.checkAll = false;
      isolatedScope.checkAllClicked();
    });

    it('checks function setSelectedItem have been called', function() {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.setSelectedItem(scope.option);
    });

    function getCompiledElement() {
      var compiledDirective = compile(angular.element('<dropdown-multiselect model="model" dropdown-title="dropdownTitle" options="options" check-all="checkAll"></dropdown-multiselect>'))(scope);
      scope.$digest();
      return compiledDirective;
    };
  });
});
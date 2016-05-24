xdescribe('canvasRect Directive Test', function () {
  var $compile, $scope, $templateCache, $document, template,
      html = '<div canvas-rect></div>',
      canvasHtml = '<canvas id="myCanvas" width="210" height="50"></canvas>';
  
  beforeEach(module('app.chart'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_, _$document_){
    $document = _$document_;
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $templateCache = _$templateCache_;
    template = $templateCache.put('canvas.html', canvasHtml);
  }));
  
  var createDirective = function () {
    var elm = angular.element(html);
    
    $compile(elm)($scope);
    document.body.appendChild(elm[0]);
    $scope.$digest();
    
    return elm;
  };
  
  describe('when created', function () {    
    it('should render the expected output', function () {
      var element = createDirective();      
      expect(element.find('canvas').length).toBe(1);
      document.body.removeChild(element[0]);
    });
    
  });
});
xdescribe('canvasRect Directive Test', function () {
    var template, compile, scope, directiveElem, $document;    
    var profitAndLossOptions = {
            width: 200,
            height: 30,
            increaseBy: 1,
            interval: 8,
            fill:0
        };
    beforeEach(function () {
        module('app.chart');
        inject(function ($templateCache, $compile, $rootScope, _$document_) {
            compile = $compile;
            scope = $rootScope.$new();
            $document = _$document_;
        });
        directiveElem = getCompiledElement();
    });


    function getCompiledElement() {
        var element = angular.element('<canvas id="myCanvas" width="210" height="50" canvas-rect options="dashboardAs.profitAndLossOptions"></canvas><canvas id="tip" width=160 height=25></canvas>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it('Should give the count 1 of anchor element inside template', function () {
        var anchorElement = directiveElem.find('a');
        expect(anchorElement.length).toEqual(1);
    });
    it('Should give the count 1 of span element inside template', function () {
        var spanElement = directiveElem.find('span');
        expect(spanElement.length).toEqual(1);
    });

    it('should increment value in scope on click of button', function () {
        var download = directiveElem.find('a');
    });


    it('Should give the count 1 of canvas element inside template', function () {
        var canvasElement = directiveElem.find('canvas');
        expect(canvasElement.length).toEqual(1);
    });
});

describe('downloadChartImage Directive Test', function () {
    var template, compile, scope, directiveElem, window, _document;
    var spyEvent;
    beforeEach(function () {
        module('app.chart');
        inject(function ($templateCache, $compile, $rootScope, _$document_) {
            compile = $compile;
            _document = _$document_;
            scope = $rootScope.$new();
            scope.id = 'canvas1';
            scope.imagename = 'booking-count-chart.png';
        });

        directiveElem = getCompiledElement();
    });

    function getCompiledElement() {
        var element = angular.element('<download-chart-image chart-id="id" image-name="imagename"></download-chart-image>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }
    
    it('Should give the count 0 of anchor element inside template', function () {
        var anchorElement = directiveElem.find('a');
        expect(anchorElement.length).toEqual(0);
    });
    it('Should give the count 1 of span element inside template', function () {
        var spanElement = directiveElem.find('span');
        expect(spanElement.length).toEqual(1);
    });
    it('should down method call', function () { 
        var canvasId = 'canvasId_download';
        console.log(_document[0]);
//        console.log(scope.$elem[0]);
//        scope._download();
        _document[0].getElementById(canvasId).toDataURL()
//        directiveElem.triggerHandler('click');
//        expect(directiveElem.isolateScope()._download).toHaveBeenCalled();
    });

});

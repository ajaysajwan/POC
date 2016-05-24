   describe("Controller Test", function () {
       describe('Scope of donut controller', function () {
        var scopeTemp, controllerTemp, timeoutTemp, intervalTemp, httpBackend, donutService;
        beforeEach(function () {
            module('donutApp');
            inject(function (_$controller_, _$httpBackend_, _$timeout_, _$interval_, _DonutService_) {
                scopeTemp = {};
                controllerTemp = _$controller_;
                timeoutTemp = _$timeout_;
                httpBackend = _$httpBackend_;
                intervalTemp = _$interval_;
                donutService = _DonutService_;
                controllerTemp('DonutController', {
                    $scope: scopeTemp
                });
                httpBackend.whenGET('data/chartModelData.json').respond([{
                    prop1: 'x'
                }]);
            })
        });
           
        it('should have DonutController toBeDefined', function() {
            expect(controllerTemp).toBeDefined();
        });
 
          
        it('should check if getDonutModel API is called in controller from service', function () {
            httpBackend.whenGET('data/chartModelData.json').respond([{
                    prop1: 'x'
                }]);
            var donutData;
            scopeTemp.setValues();
            donutService.getDonutModel().then(function (resp) {
                donutData = resp.data;
                expect(donutData).toEqual([{
                    prop1: 'x'
                }]);
            });
            httpBackend.flush();
        });
           
           
        it('should check for the timeout function', function () {
           scopeTemp.setValues = jasmine.createSpy();
            timeoutTemp.flush();
            expect(scopeTemp.setValues).toHaveBeenCalled();
        });
           
        it('should register the intervals', function () {
            expect(scopeTemp.demoValue).toBe(0);
            intervalTemp.flush(2000);
            //expect(scopeTemp.demoValue).toBe(0);
            /*var intervalTemp = jasmine.createSpy('intervalTemp', intervalTemp);
            expect(intervalTemp).toHaveBeenCalled();*/
        });
           
        it('should check for the onClickSetModel function', function () {
            expect(scopeTemp.showModel).toBe(false);
            expect(scopeTemp.selectedModel).toEqual([]);    
            expect(typeof(scopeTemp.onClickSetModel)).toBe('function');
            var temp = [{prop1: 'x'}];
            scopeTemp.onClickSetModel(temp);
            scopeTemp.selectedModel = temp;
            if(scopeTemp.selectedModel ){
                 expect(scopeTemp.showModel).toBe(true);
            }
            expect(scopeTemp.selectedModel).toEqual([{prop1: 'x'}]);  
             
        });
           it('else should check for the onClickSetModel function', function () {
             expect(scopeTemp.showModel).toBe(false);
            expect(scopeTemp.selectedModel).toEqual([]);    
            expect(typeof(scopeTemp.onClickSetModel)).toBe('function');
            var temp ;
            scopeTemp.onClickSetModel(temp);
            scopeTemp.selectedModel = temp;
            if(scopeTemp.selectedModel ){}
            else{
                scopeTemp.showModel = false;
                 expect(scopeTemp.showModel).toBe(false);
            }
        });
           
        it('should return showModel to be false', function() {
            expect(scopeTemp.showModel).toBe(false);
        });
           
       });
   });
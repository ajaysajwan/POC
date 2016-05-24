// Karma configuration
// Generated on Sun Jan 10 2016 20:00:49 GMT+0530 (India Standard Time)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            "node_modules/chart.js/dist/Chart.js",
            "node_modules/angular/angular.min.js",
            "node_modules/angular-route/angular-route.min.js",
            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
            "app/common/tc-angular-chartjs.js",
            "node_modules/angular-mocks/angular-mocks.js",
            "app/app.module.js",
            "app/app.config.js",
            "app/dashboard/dashboard.controller.js",
            "app/dashboard/dashboard.factory.js",
            "app/common/chart.directive.js",
            "app/dashboard/*.html",
            "app/dashboard/dashboard.factory.spec.js",
            "app/dashboard/dashboard.controller.spec.js",
            "app/common/*.directive.spec.js",
            "app/app.*.spec.js"

//            "node_modules/angular/angular.min.js",
//            "node_modules/angular-route/angular-route.min.js",
//            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
//            "node_modules/angular-mocks/angular-mocks.js",
//            "app/app.*.js",
//            "app/dashboard/dashboard.*.js",
//            "app/dashboard/dashboard.controller.js",
//            "app/common/*.directive.js",
//            "app/dashboard/*.html",
//            "app/dashboard/dashboard.factory.spec.js",
//            "app/dashboard/dashboard.controller.spec.js",
//            "app/common/*.directive.spec.js",
//            "app/app.*.spec.js"
        ],
        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "app/app.module.js": "coverage",
            "app/app.config.js": "coverage",
            "app/dashboard/dashboard.controller.js": "coverage",
            "app/dashboard/dashboard.factory.js": "coverage",
            "app/common/chart.directive.js": "coverage",
            "app/dashboard/*.html": ['ng-html2js']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },


        // web server port
        port: 15961,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome'],
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}

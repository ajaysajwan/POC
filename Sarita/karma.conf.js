// Karma configuration
// Generated on Tue May 24 2016 12:38:31 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		"https://www.google.com/jsapi",
		"node_modules/angular/angular.js",
		"node_modules/angular-mocks/angular-mocks.js",
		"charts/js/app.js",
		"charts/js/jquery-min.js",
		"charts/lib/angular-google-chart.js",
		"charts/lib/angular-animate.min.js",
		"charts/directives/bar-chart.js",
		"charts/directives/column-chart.js",
		"charts/directives/line-chart.js",
		"charts/directives/pie-chart.js",
		"charts/directives/area-chart.js",
		"spec/AreaChartDirectiveSpec.js",
		"spec/BarChartDirectiveSpec.js",
		"spec/ColumnChartDirectiveSpec.js",
		"spec/LineChartDirectiveSpec.js",
		"spec/PieChartDirectiveSpec.js",
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

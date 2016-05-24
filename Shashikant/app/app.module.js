/* app.module.js
In this, we are inject multiple module which is created based on Feature of project.
1. app.config - we are creating routing configuration for the project
2. app.dashboard - All dashboard component in this module.
*/
(function () {
    'use strict';
    angular.module('chartsApp', [
        /* Feature modules */
        'app.config',
        'app.dashboard',
        'app.home'
    ]);
})();
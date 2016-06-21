(function () {

    'use strict';

    angular.module('appTechTest1')
        .factory(errorInterceptor.name, errorInterceptor);

    errorInterceptor.$inject = ['$log'];

    function errorInterceptor($log) {
        return {
            'response': function (response) {
                $log.debug('Checking the response object for errors...');
                return response;
            }
        };
    }
} ());

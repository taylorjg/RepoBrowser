(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(spinnerInterceptor.name, spinnerInterceptor);

    spinnerInterceptor.$inject = ['$log'];

    function spinnerInterceptor($log) {
        return {
            'request': function(config) {
                $log.debug('Start spinning...');
                return config;
            },
            'response': function(response) {
                $log.debug('Stop spinning...');
                return response;
            }
        };
    }
} ());

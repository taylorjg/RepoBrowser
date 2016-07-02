(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(authenticationInterceptor.name, authenticationInterceptor);

    authenticationInterceptor.$inject = ['$log'];

    function authenticationInterceptor($log) {
        return {
            'request': function (config) {
                $log.debug('Adding authentication header to the config object...');
                return config;
            }
        };
    }
} ());

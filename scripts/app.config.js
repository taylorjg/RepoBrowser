(function() {

    'use strict';

    angular.module('appTechTest1').config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptor');
        $httpProvider.interceptors.push('errorInterceptor');
        $httpProvider.interceptors.push('spinnerInterceptor');
    }
}());

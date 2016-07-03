(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(spinnerInterceptor.name, spinnerInterceptor);

    spinnerInterceptor.$inject = ['$rootScope', '$q'];

    function spinnerInterceptor($rootScope, $q) {
        return {
            'request': function(config) {
                $rootScope.$broadcast('GITHUBAPI_BEGIN');
                return config;
            },
            'requestError': function(rejection) {
                $rootScope.$broadcast('GITHUBAPI_END');
                return $q.reject(rejection);
            },
            'response': function(response) {
                $rootScope.$broadcast('GITHUBAPI_END');
                return response;
            },
            'responseError': function(rejection) {
                $rootScope.$broadcast('GITHUBAPI_END');
                return $q.reject(rejection);
            }
        };
    }
} ());

(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(errorInterceptor.name, errorInterceptor);

    errorInterceptor.$inject = ['$q', '$rootScope'];

    function errorInterceptor($q, $rootScope) {
        return {
            'response': function (response) {
                $rootScope.$broadcast("GITHUBAPI_CLEAR_ERROR");
                return response;
            },
            'responseError': function (rejection) {
                $rootScope.$broadcast("GITHUBAPI_ERROR", rejection);
                return $q.reject(rejection);
            }
        };
    }
} ());

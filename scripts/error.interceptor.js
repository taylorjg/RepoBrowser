(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(errorInterceptor.name, errorInterceptor);

    errorInterceptor.$inject = ['$q', '$rootScope'];

    function errorInterceptor($q, $rootScope) {
        return {
            'responseError': function (rejection) {
                $rootScope.$broadcast("GITHUBAPI_ERROR", rejection);
                return $q.reject(rejection);
            }
        };
    }
} ());

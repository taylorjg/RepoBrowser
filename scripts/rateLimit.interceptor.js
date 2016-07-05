(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(rateLimitInterceptor.name, rateLimitInterceptor);

    rateLimitInterceptor.$inject = ['$q', 'RateLimit'];

    function rateLimitInterceptor($q, RateLimit) {
        return {
            'response': function(response) {
                if (response.headers('X-RateLimit-Limit') && response.headers('X-RateLimit-Remaining')) {
                    RateLimit.limit = Number(response.headers('X-RateLimit-Limit'));
                    RateLimit.remaining = Number(response.headers('X-RateLimit-Remaining'));
                    RateLimit.reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
                }
                return response;
            },
            'responseError': function(rejection) {
                if (rejection.headers('X-RateLimit-Limit') && rejection.headers('X-RateLimit-Remaining')) {
                    RateLimit.limit = Number(rejection.headers('X-RateLimit-Limit'));
                    RateLimit.remaining = Number(rejection.headers('X-RateLimit-Remaining'));
                    RateLimit.reset = new Date(Number(rejection.headers('X-RateLimit-Reset')) * 1000);
                }
                return $q.reject(rejection);
            }
        };
    }
} ());

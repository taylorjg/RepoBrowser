(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(rateLimitInterceptor.name, rateLimitInterceptor);

    rateLimitInterceptor.$inject = ['$q', 'RateLimitState'];

    function rateLimitInterceptor($q, RateLimitState) {
        return {
            'response': function(response) {
                if (response.headers('X-RateLimit-Limit') && response.headers('X-RateLimit-Remaining')) {
                    RateLimitState.limit = Number(response.headers('X-RateLimit-Limit'));
                    RateLimitState.remaining = Number(response.headers('X-RateLimit-Remaining'));
                    RateLimitState.reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
                }
                return response;
            },
            'responseError': function(rejection) {
                if (rejection.headers('X-RateLimit-Limit') && rejection.headers('X-RateLimit-Remaining')) {
                    RateLimitState.limit = Number(rejection.headers('X-RateLimit-Limit'));
                    RateLimitState.remaining = Number(rejection.headers('X-RateLimit-Remaining'));
                    RateLimitState.reset = new Date(Number(rejection.headers('X-RateLimit-Reset')) * 1000);
                }
                return $q.reject(rejection);
            }
        };
    }
} ());

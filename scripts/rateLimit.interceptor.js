(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(rateLimitInterceptor.name, rateLimitInterceptor);

    rateLimitInterceptor.$inject = ['RateLimit'];

    function rateLimitInterceptor(RateLimit) {
        return {
            'response': function(response) {
                if (response.headers('X-RateLimit-Limit') && response.headers('X-RateLimit-Remaining')) {
                    RateLimit.limit = Number(response.headers('X-RateLimit-Limit'));
                    RateLimit.remaining = Number(response.headers('X-RateLimit-Remaining'));
                    RateLimit.reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
                }
                return response;
            }
        };
    }
} ());

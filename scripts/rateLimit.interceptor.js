(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(rateLimitInterceptor.name, rateLimitInterceptor);

    rateLimitInterceptor.$inject = [];

    function rateLimitInterceptor() {
        return {
            'response': function(response) {
                var limit = Number(response.headers('X-RateLimit-Limit'));
                var remaining = Number(response.headers('X-RateLimit-Remaining'));
                var reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
                console.log('X-RateLimit-Limit:', limit);
                console.log('X-RateLimit-Remaining:', remaining);
                console.log('X-RateLimit-Reset:', reset);
                return response;
            }
        };
    }
} ());

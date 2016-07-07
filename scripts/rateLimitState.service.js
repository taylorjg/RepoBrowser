(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(RateLimitState.name, RateLimitState);

    RateLimitState.$inject = [];

    function RateLimitState() {
        return {
            limit: 0,
            remaining: 0,
            reset: new Date(0)
        };
    }
} ());

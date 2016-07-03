(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(RateLimit.name, RateLimit);

    RateLimit.$inject = [];

    function RateLimit() {
        return {
            limit: 0,
            remaining: 0,
            reset: new Date(0)
        };
    }
} ());

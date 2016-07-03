(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(RateLimit.name, RateLimit);

    RateLimit.$inject = [];

    function RateLimit() {
        return {
        };
    }
} ());
